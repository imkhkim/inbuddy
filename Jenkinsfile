pipeline {
    agent any

    stages {
      stage('.env 복사') {
        steps {
          sh 'rm ./scheduler/.env || true'
          sh 'cp ../.env/.env ./scheduler/.env || true'
        }
      }

      stage('scheduler 도커 이미지 생성') {
        steps {
          sh '''
            docker stop scheduler || true &&
            docker rm scheduler || true &&
            docker rmi scheduler || true &&
            docker build -t scheduler -f /var/lib/jenkins/workspace/.Dockerfiles/dev/scheduler/Dockerfile . &&
            docker run --name scheduler -d -p 8001:8000 scheduler
          '''
        }
      }
    }

    post {
        success {
            script {
                def authorName = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
                def commiterName = sh(script: "git show -s --pretty=%cn", returnStdout: true).trim()

                mattermostSend (color: 'good',
                message: "${env.BRANCH_NAME}: ${commiterName}님이 커밋하고 ${authorName}님이 요청한 ${env.BUILD_NUMBER}번째 Merge 나왔습니다~ (<${env.BUILD_URL}|상세정보>)",
                endpoint: 'https://meeting.ssafy.com/hooks/rwenugt7g3g6mb176qcwdefioo',
                icon: 'https://www.notion.so/image/https%3A%2F%2Fcdn.icon-icons.com%2Ficons2%2F2699%2FPNG%2F512%2Fjenkins_logo_icon_170552.png?table=block&id=575d933c-a155-4d41-987e-887b341928ba&spaceId=0f7cf07a-b632-46e9-b39b-7c12c129b0d0&userId=fcb99ecb-2346-4edb-9302-eea7d618e9d4&cache=v2',
                channel: 'b110-jenkins-notification'
                )
            }
        }

        failure {
            script {
                def authorName = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
                def commiterName = sh(script: "git show -s --pretty=%cn", returnStdout: true).trim()

                mattermostSend (color: 'danger',
                message: "${env.BRANCH_NAME}: ${commiterName}님이 커밋하고 ${authorName}님이 요청한 ${env.BUILD_NUMBER}번째 Merge 아직 안 나왔습니다. (<${env.BUILD_URL}|상세정보>)",
                endpoint: 'https://meeting.ssafy.com/hooks/rwenugt7g3g6mb176qcwdefioo',
                icon: 'https://www.notion.so/image/https%3A%2F%2Fcdn.icon-icons.com%2Ficons2%2F2699%2FPNG%2F512%2Fjenkins_logo_icon_170552.png?table=block&id=575d933c-a155-4d41-987e-887b341928ba&spaceId=0f7cf07a-b632-46e9-b39b-7c12c129b0d0&userId=fcb99ecb-2346-4edb-9302-eea7d618e9d4&cache=v2',
                channel: 'b110-jenkins-notification'
                )
            }
        }
    }
}
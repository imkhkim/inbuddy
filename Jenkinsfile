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
            docker run --name scheduler -d -p 8001:8000
          '''
        }
      }
    }

    post {
        success {
            script {
                def Author_ID = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
                def Author_Name = sh(script: "git show -s --pretty=%ae", returnStdout: true).trim()
                def Current_Branch = sh(script: "git branch --show-current", returnStdout: true).trim()
                
                mattermostSend (color: 'good',
                message: "${Author_ID}님이 ${Current_Branch}에 요청하신 ${env.BUILD_NUMBER}번째 ${env.JOB_NAME}빌드 나왔습니다~ (<${env.BUILD_URL}|상세정보>)",
                endpoint: 'https://meeting.ssafy.com/hooks/rwenugt7g3g6mb176qcwdefioo',
                icon: 'https://www.notion.so/image/https%3A%2F%2Fcdn.icon-icons.com%2Ficons2%2F2699%2FPNG%2F512%2Fjenkins_logo_icon_170552.png?table=block&id=575d933c-a155-4d41-987e-887b341928ba&spaceId=0f7cf07a-b632-46e9-b39b-7c12c129b0d0&userId=fcb99ecb-2346-4edb-9302-eea7d618e9d4&cache=v2'
                channel: 'b110-jenkins-notification'
                )
            }
        }
        failure {
            script {
                def Author_ID = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
                def Author_Name = sh(script: "git show -s --pretty=%ae", returnStdout: true).trim()
                def Current_Branch = sh(script: "git branch --show-current", returnStdout: true).trim()

                mattermostSend (color: 'danger',
                message: "${Author_ID}님이 ${Current_Branch}에 요청하신 ${env.BUILD_NUMBER}번째 ${env.JOB_NAME} 아직 안 나왔습니다. (<${env.BUILD_URL}|상세정보>)",
                endpoint: 'https://meeting.ssafy.com/hooks/rwenugt7g3g6mb176qcwdefioo',
                icon: 'https://www.notion.so/image/https%3A%2F%2Fcdn.icon-icons.com%2Ficons2%2F2699%2FPNG%2F512%2Fjenkins_logo_icon_170552.png?table=block&id=575d933c-a155-4d41-987e-887b341928ba&spaceId=0f7cf07a-b632-46e9-b39b-7c12c129b0d0&userId=fcb99ecb-2346-4edb-9302-eea7d618e9d4&cache=v2'
                channel: 'b110-jenkins-notification'
                )
            }
        }
    }
}
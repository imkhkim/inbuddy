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
                mattermostSend (color: 'good',
                message: "${Author_ID}님이 Merge한 ${env.BUILD_NUMBER}번째 ${env.JOB_NAME} 빌드 성공!!(<${env.BUILD_URL}|Details>)",
                endpoint: 'https://meeting.ssafy.com/hooks/rwenugt7g3g6mb176qcwdefioo',
                channel: 'b110-jenkins-notification'
                )
            }
        }
        failure {
            script {
                def Author_ID = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
                def Author_Name = sh(script: "git show -s --pretty=%ae", returnStdout: true).trim()
                mattermostSend (color: 'danger',
                message: "${Author_ID}님이 Merge한 ${env.BUILD_NUMBER}번째 ${env.JOB_NAME} 빌드 실패ㅜㅜ(<${env.BUILD_URL}|Details>)",
                endpoint: 'https://meeting.ssafy.com/hooks/rwenugt7g3g6mb176qcwdefioo',
                channel: 'b110-jenkins-notification'
                )
            }
        }
    }
}
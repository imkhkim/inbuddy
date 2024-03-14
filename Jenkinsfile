pipeline {
    agent any

    tools {
        nodejs 'default'
    }

    stages {
        stage('React App 빌드') {
            steps {
                dir('client') {
                    sh 'npm i && npm run build'
                }
            }
        }

        stage('React App 도커 이미지 생성') {
            steps {
              sh 'docker stop client_dev || true'
              sh 'docker rm client_dev || true'
              sh 'docker rmi client/dev || true'
              sh 'docker build -t client/dev -f /var/lib/jenkins/workspace/.Dockerfiles/dev/fe/Dockerfile .'
            }
        }

        stage('React App 컨테이너 실행') {
            steps {
              sh 'docker run --name client_dev -d -p 5174:5173 client/dev'
            }
        }
    }
}

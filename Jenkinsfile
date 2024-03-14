pipeline {
    agent any

    tools {
        gradle 'default'
    }

    stages {
        stage('properties 복사') {
            steps {
                sh q'rm ./server/src/main/resources/application.properties || mkdir ./server/src/main/resources || true'
                sh 'cp ../.properties/application.dev.properties ./server/src/main/resources/application.properties'
            }
        }

        stage('SpringBoot 빌드') {
            steps {
                dir('server') {
                    /** clean and slow build with info **/
                    // sh 'chmod +x gradlew && ./gradlew clean --info build'

                    /** normal build **/
                    // sh 'chmod +x gradlew && ./gradlew build'

                    /** fast build **/
                    sh 'chmod +x gradlew && ./gradlew bootJar'
                }
            }
        }

        stage('SpringBoot 도커 이미지 생성') {
            steps {
                /** server/dev은 docker image 이름, server_dev은 container의 이름 **/
                sh '''
                    docker stop server_dev || true &&
                    docker rm server_dev || true &&
                    docker rmi server/dev || true &&
                    docker build -t server/dev -f /var/lib/jenkins/workspace/.Dockerfiles/dev/be/Dockerfile . &&
                    docker run --name server_dev -d -p 8081:8080 server/dev
                '''
            }
        }
    }
}

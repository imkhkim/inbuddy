pipeline {
    agent any

    tools {
        gradle 'default'
        nodejs 'default'
    }

    stages {
        stage('properties 복사') {
      steps {
        sh 'rm ./server/src/main/resources/application.properties || mkdir ./server/src/main/resources || true'
        sh 'cp ../.properties/application.release.properties ./server/src/main/resources/application.properties'
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
          /** server/main은 docker image 이름, server_main은 container의 이름 **/
          sh 'docker stop server_main || true'
          sh 'docker rm server_main || true'
          sh 'docker rmi server/main || true'
          sh 'docker build -t server/main -f /var/lib/jenkins/workspace/.Dockerfiles/main/be/Dockerfile .'
      }
        }

        stage('SpringBoot 컨테이너 실행') {
      steps {
        sh 'docker run --name server_main -d -p 8080:8080 server/main'
      }
        }
    }
}

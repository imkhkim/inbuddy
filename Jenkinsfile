pipeline {
    agent any

    tools {
        gradle 'default'
    }

    stages {
        /*
        stage('clone') {
            steps {
                sh 'echo 소스 코드를 최신화합니다.'
                git credentialsId: 'personal_token', url: 'https://lab.ssafy.com/s10-webmobile1-sub3/S10P13B112.git'
            }
        }
        */

        stage('이전 컨테이너 삭제') {
      steps {
        sh '''
                    docker stop springboot || true &&
                    docker rm springboot || true &&
                    docker rmi b112/springboot || true
                '''
      }
        }

        stage('properties 복사') {
      steps {
        sh 'rm ./server/src/main/resources/application.properties || true'
        sh 'cp /var/lib/jenkins/workspace/.properties/application.dev.properties ./server/src/main/resources/application.properties'
      }
        }

        stage('SpringBoot 빌드') {
      steps {
        dir('server') {
          sh 'chmod +x gradlew && ./gradlew clean --info build' // clean build with info
        // sh 'chmod +x gradlew && ./gradlew build' // normal build
        }
      }
        }

        stage('도커 이미지 생성') {
      steps {
          // sh 'docker build . -t b110/springboot'
          sh 'docker build -t b110/springboot -f /var/lib/jenkins/workspace/.Dockerfiles/dev/be/Dockerfile .'
      }
        }

        stage('SpringBoot 컨테이너 실행') {
      steps {
        sh 'docker run --name springboot -d -p 8080:8080 b110/springboot'
      }
        }
    }
}

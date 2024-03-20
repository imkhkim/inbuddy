pipeline {
  agent any

  tools {
      gradle 'default'
  }

  stages {
    stage('properties 복사') {
      steps {
        sh 'rm -f ./server/src/main/resources/application.properties && mkdir ./server/src/main/resources || true'
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

    stage('Container 재시작') {
      steps {
        sh 'docker compose -f ~/workspace/inbuddy/.docker/docker-compose-dev.yml restart dev-be'
      }
    }
  }
}

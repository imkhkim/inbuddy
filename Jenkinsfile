pipeline {
  agent any

  environment {
    RELEASE_METADATA = '/var/lib/jenkins/workspace/inbuddy/release'

    SRC_RESOURCES = './server/src/main/resources/'
  }

  tools {
      gradle 'default'
      nodejs 'default'
  }

  stages {
    // Spring Boot Application
    stage('properties 복사') {
      steps {
        sh "rm -f ${env.SRC_RESOURCES}/application.properties && mkdir ${env.SRC_RESOURCES} || true"
        sh "cp ${env.RELEASE_METADATA}/be/application.properties ${env.SRC_RESOURCES}/application.properties"
      }
    }

    stage('.env, start.sh 복사') {
      steps {
        sh "rm -f ./scheduler/.env && cp ${env.RELEASE_METADATA}/scheduler/.env ./scheduler/.env"
        sh "rm -f ./scheduler/start.sh && cp ${env.RELEASE_METADATA}/scheduler/start.sh ./scheduler/start.sh"
      }
    }

    stage('빌드') {
      parallel {
        stage("Spring Boot App 빌드") {
          steps {
            dir('server') {
              /** clean and slow build with info **/
              // sh "chmod +x gradlew && ./gradlew clean --info build"

              /** normal build **/
              // sh "chmod +x gradlew && ./gradlew build"

              /** fast build **/
              sh 'chmod +x gradlew && ./gradlew bootJar'
            }
          }
        }

        stage('React App 빌드') {
          steps {
            dir('client') {
              sh 'npm i && npm run build'
            }
          }
        }
      }
    }

    stage('Container 재시작') {
      steps {
        sh "docker compose -f ${env.RELEASE_METADATA}/docker-compose-release.yml restart springboot react scheduler"
      }
    }
  }
}

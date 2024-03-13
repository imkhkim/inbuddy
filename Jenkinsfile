pipeline {
    agent any

    tools {
        nodejs "default"
        gradle 'default'
    }

    stages {
        stage('테스트') {
            steps {
                sh 'echo webhook-test 브랜치 테스트 성공'
            }
        }
    }
}

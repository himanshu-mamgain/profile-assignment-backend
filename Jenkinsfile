pipeline {
    agent any
    stages {
        stage("build") {
            steps {
                echo 'building the application...'
                echo 'executing yarn...'
                nodejs('Node-22.9') {
                    sh 'yarn install'
                }
            }
        }

        stage("test") {
            steps {
                echo 'testing the application...'
                
            }
        }

        stage("deploy") {
            steps {
                echo 'deploying the application...'
            }
        }

        stage("checkout") {
            steps {
                echo 'checkout the application...'
            }
        }
    }
}
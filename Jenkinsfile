pipeline {
    agent {
        docker { image 'docker' }
    }

    environment {
        AWS_REGION = 'us-east-1'
        ECR_REPO = '008971675228.dkr.ecr.us-east-1.amazonaws.com/profile'
        AWS_CREDENTIALS_ID = 'aws-creds'
    }

    stages {
        stage("Clean Workspace") {
            steps {
                deleteDir()
            }
        }

        stage("Clone Github Repository") {
            steps {
                git branch: 'master', credentialsId: "github-creds", url: 'https://github.com/himanshu-mamgain/profile-assignment-backend.git'
                // sh 'chmod -R 777 /var/jenkins_home/workspace/*'
            }
        }

        stage("Checkout Repo") {
            steps {
                checkout scmGit(
                    branches: [[name: '*/master']],
                    userRemoteConfigs: [[credentialsId: 'github-creds', url: 'https://github.com/himanshu-mamgain/profile-assignment-backend.git']]
                )
            }
        }

        stage("Build Docker Image") {
            steps {
                script {
                    sh "docker build --no-cache -t profile ."
                    echo "$JOB_NAME:v1.$BUILD_ID"
                    sh "docker tag profile:latest 008971675228.dkr.ecr.us-east-1.amazonaws.com/profile:latest"
                }
            }
        }

        stage("Push Image to ECR") {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: "${AWS_CREDENTIALS_ID}", passwordVariable: 'AWS_SECRET_ACCESS_KEY', usernameVariable: 'AWS_ACCESS_KEY_ID')]) {
                        sh "aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 008971675228.dkr.ecr.us-east-1.amazonaws.com"
                        sh "docker push 008971675228.dkr.ecr.us-east-1.amazonaws.com/profile:latest"
                        sh "docker rmi profile:latest"
                        sh "docker system prune -af"
                    }
                }
            }
        }

        stage("Deployment") {
            steps {
                script {
                    // Add ECS deployment script here
                    echo "Deploying to ECS..."
                }
            }
        }
    }
}
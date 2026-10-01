import type { DiagramSpec, Project } from "@/lib/types";

export const darkroomDiagram: DiagramSpec = {
  title: "Darkroom architecture",
  description:
    "A push to GitHub runs GitHub Actions, which pushes an image to ECR; CodePipeline and CodeDeploy roll it out to ECS Fargate behind an Application Load Balancer. The application stores descriptions in RDS PostgreSQL, reads credentials from Secrets Manager, and stores images in a private S3 bucket served through CloudFront.",
  width: 800,
  height: 440,
  nodes: [
    { id: "github", x: 24, y: 24, w: 130, label: "GitHub", meta: "main" },
    { id: "actions", x: 186, y: 24, w: 150, label: "GitHub Actions", meta: "OIDC · test · build" },
    { id: "ecr", x: 368, y: 24, w: 120, label: "Amazon ECR", meta: "image" },
    { id: "deploy", x: 520, y: 24, w: 256, label: "CodePipeline · CodeDeploy", meta: "blue/green" },
    { id: "visitor", x: 24, y: 192, w: 130, label: "Visitor", meta: "browser", tone: "muted" },
    { id: "alb", x: 186, y: 192, w: 150, label: "Load balancer", meta: "ALB" },
    { id: "ecs", x: 520, y: 192, w: 256, label: "ECS Fargate", meta: "Python app · Docker", tone: "accent" },
    { id: "cloudfront", x: 186, y: 360, w: 150, label: "CloudFront", meta: "images · OAC" },
    { id: "s3", x: 368, y: 360, w: 120, label: "Private S3", meta: "photos/" },
    { id: "rds", x: 520, y: 360, w: 120, label: "RDS", meta: "PostgreSQL" },
    { id: "secrets", x: 656, y: 360, w: 120, label: "Secrets", meta: "Manager" },
  ],
  edges: [
    { id: "github-actions", from: "github", to: "actions", points: [[154, 52], [186, 52]] },
    { id: "actions-ecr", from: "actions", to: "ecr", points: [[336, 52], [368, 52]] },
    { id: "ecr-deploy", from: "ecr", to: "deploy", points: [[488, 52], [520, 52]] },
    { id: "deploy-ecs", from: "deploy", to: "ecs", points: [[648, 80], [648, 192]], label: "new task set", labelAt: [656, 140] },
    { id: "visitor-alb", from: "visitor", to: "alb", points: [[154, 220], [186, 220]] },
    { id: "alb-ecs", from: "alb", to: "ecs", points: [[336, 220], [520, 220]], label: "/health", labelAt: [428, 208] },
    { id: "ecs-rds", from: "ecs", to: "rds", points: [[580, 248], [580, 360]], label: "/ready", labelAt: [588, 312] },
    { id: "secrets-ecs", from: "secrets", to: "ecs", points: [[716, 360], [716, 248]], dashed: true },
    { id: "ecs-s3", from: "ecs", to: "s3", points: [[540, 248], [540, 296], [428, 296], [428, 360]] },
    { id: "s3-cloudfront", from: "s3", to: "cloudfront", points: [[368, 388], [336, 388]] },
    { id: "cloudfront-visitor", from: "cloudfront", to: "visitor", points: [[186, 388], [89, 388], [89, 248]] },
  ],
};

const aureynxDiagram: DiagramSpec = {
  title: "Aureynx platform architecture",
  description:
    "An offline-first React Native app synchronises with a Django REST API in the background. The API stores data in PostgreSQL, uses Redis, pushes live GPS updates to a React dashboard over WebSockets, and feeds machine learning models for behaviour classification and movement prediction.",
  width: 800,
  height: 420,
  nodes: [
    { id: "mobile", x: 24, y: 40, w: 220, label: "React Native app", meta: "offline-first · local store" },
    { id: "dashboard", x: 556, y: 40, w: 220, label: "React dashboard", meta: "live tracking" },
    { id: "api", x: 290, y: 192, w: 220, label: "Django REST API", meta: "auth · REST · WebSockets", tone: "accent" },
    { id: "pg", x: 60, y: 344, w: 170, label: "PostgreSQL", meta: "source of truth" },
    { id: "redis", x: 310, y: 344, w: 180, label: "Redis" },
    { id: "ml", x: 560, y: 344, w: 216, label: "ML models", meta: "LSTM · XGBoost" },
  ],
  edges: [
    { id: "mobile-api", from: "mobile", to: "api", points: [[134, 96], [134, 220], [290, 220]], label: "background sync", labelAt: [142, 160] },
    { id: "api-dashboard", from: "api", to: "dashboard", points: [[510, 220], [666, 220], [666, 96]], label: "live GPS", labelAt: [674, 160] },
    { id: "api-pg", from: "api", to: "pg", points: [[330, 248], [330, 296], [145, 296], [145, 344]] },
    { id: "api-redis", from: "api", to: "redis", points: [[400, 248], [400, 344]] },
    { id: "api-ml", from: "api", to: "ml", points: [[470, 248], [470, 296], [668, 296], [668, 344]] },
  ],
};

const chronicDiagram: DiagramSpec = {
  title: "Chronic Disease Management System architecture",
  description:
    "A Flutter mobile client calls a FastAPI backend over REST. The API runs machine learning inference with models built in TensorFlow and scikit-learn, and stores data in MongoDB.",
  width: 800,
  height: 400,
  nodes: [
    { id: "flutter", x: 24, y: 130, w: 200, label: "Flutter client", meta: "mobile" },
    { id: "api", x: 300, y: 130, w: 200, label: "FastAPI", meta: "REST API", tone: "accent" },
    { id: "model", x: 576, y: 130, w: 200, label: "Inference", meta: "TensorFlow · scikit-learn" },
    { id: "mongo", x: 300, y: 300, w: 200, label: "MongoDB", meta: "storage" },
  ],
  edges: [
    { id: "flutter-api", from: "flutter", to: "api", points: [[224, 150], [300, 150]], label: "request", labelAt: [262, 138] },
    { id: "api-flutter", from: "api", to: "flutter", points: [[300, 170], [224, 170]], label: "prediction", labelAt: [262, 194] },
    { id: "api-model", from: "api", to: "model", points: [[500, 158], [576, 158]] },
    { id: "api-mongo", from: "api", to: "mongo", points: [[400, 186], [400, 300]] },
  ],
};

const medicalDiagram: DiagramSpec = {
  title: "Medical question-answering pipeline",
  description:
    "A question and a passage of verified medical text go into a fine-tuned DistilBERT model, which predicts the start and end of the answer inside the passage. The answer span is served through a Gradio interface on Hugging Face Spaces.",
  width: 800,
  height: 400,
  nodes: [
    { id: "question", x: 24, y: 60, w: 200, label: "Question", meta: "user input", tone: "muted" },
    { id: "context", x: 24, y: 250, w: 200, label: "Verified medical text", meta: "context passage" },
    { id: "model", x: 300, y: 150, w: 200, label: "DistilBERT", meta: "fine-tuned · TensorFlow", tone: "accent" },
    { id: "span", x: 576, y: 150, w: 200, label: "Answer span", meta: "start · end" },
    { id: "app", x: 576, y: 310, w: 200, label: "Gradio app", meta: "Hugging Face Spaces" },
  ],
  edges: [
    { id: "question-model", from: "question", to: "model", points: [[224, 88], [262, 88], [262, 178]], arrow: false },
    { id: "context-model", from: "context", to: "model", points: [[224, 278], [262, 278], [262, 178], [300, 178]] },
    { id: "model-span", from: "model", to: "span", points: [[500, 178], [576, 178]] },
    { id: "span-app", from: "span", to: "app", points: [[676, 206], [676, 310]] },
  ],
};

const microscopyDiagram: DiagramSpec = {
  title: "Clinical microscopy analysis pipeline",
  description:
    "Microscopy images are preprocessed and validated, then passed through a pretrained ResNet adapted with transfer learning to detect malaria parasites and sickle cells.",
  width: 800,
  height: 400,
  nodes: [
    { id: "image", x: 24, y: 150, w: 150, label: "Microscopy image", meta: "input", tone: "muted" },
    { id: "prep", x: 214, y: 150, w: 150, label: "Preprocessing", meta: "validation" },
    { id: "resnet", x: 404, y: 150, w: 160, label: "ResNet", meta: "transfer learning", tone: "accent" },
    { id: "malaria", x: 614, y: 70, w: 162, label: "Malaria parasite", meta: "detection" },
    { id: "sickle", x: 614, y: 230, w: 162, label: "Sickle cell", meta: "detection" },
  ],
  edges: [
    { id: "image-prep", from: "image", to: "prep", points: [[174, 178], [214, 178]] },
    { id: "prep-resnet", from: "prep", to: "resnet", points: [[364, 178], [404, 178]] },
    { id: "resnet-malaria", from: "resnet", to: "malaria", points: [[564, 178], [590, 178], [590, 98], [614, 98]] },
    { id: "resnet-sickle", from: "resnet", to: "sickle", points: [[590, 178], [590, 258], [614, 258]] },
  ],
};

export const projects: Project[] = [
  {
    slug: "darkroom",
    index: "01",
    name: "Darkroom",
    kind: "Cloud-native Python application",
    domain: "Cloud & DevOps",
    summary:
      "A Python photo application on AWS, released by a pipeline that will not ship a failing build.",
    tagline:
      "A shared photo wall where the application is deliberately small and the engineering is everything around it: infrastructure as code, keyless CI, blue/green releases and health checks designed for failure.",
    code: "public",
    links: [
      { label: "Application repository", href: "https://github.com/sjamillah/photo-uploader-app" },
      { label: "Infrastructure repository", href: "https://github.com/sjamillah/photo-uploader-infra" },
    ],
    metrics: [
      { value: "ECS Fargate", label: "behind an Application Load Balancer" },
      { value: "0", label: "AWS access keys, GitHub Actions uses OIDC" },
      { value: "Blue/green", label: "releases through CodeDeploy" },
    ],
    focus: "Infrastructure and deployment architecture",
    problem: [
      "Darkroom is a shared wall for photographs: upload an image, describe it, and it appears for everyone. There are no accounts.",
      "The product is simple on purpose. The real problem is operating it properly on AWS: no long-lived credentials anywhere, a release process that cannot push an untested image, deployments that do not drop traffic, and enough visibility to fix a deployment when it gets stuck.",
    ],
    approach: [
      {
        title: "Containerised Python service",
        body: "The application runs as a Docker container on ECS Fargate in private subnets, behind an internet-facing Application Load Balancer.",
      },
      {
        title: "Data split by access pattern",
        body: "Descriptions live in RDS PostgreSQL. Images live in a private S3 bucket that only CloudFront can read, so the bucket is never public.",
      },
      {
        title: "Everything in CloudFormation",
        body: "The network, IAM, database, service, pipeline and alarms are CloudFormation templates. Credentials come from Secrets Manager rather than configuration.",
      },
      {
        title: "Keyless delivery",
        body: "GitHub Actions authenticates to AWS with OIDC. The role trusts one repository on main, so a fork or another branch is refused.",
      },
    ],
    architecture: {
      intro:
        "Two paths run through the system. The delivery path takes a commit to a running task. The request path serves pages from the containers and images from the edge.",
      diagram: darkroomDiagram,
    },
    implementation: [
      {
        title: "Tests gate the registry",
        body: "Every pull request runs linting and the test suite. The build job depends on the test job, so nothing reaches ECR past a failing test, whether it arrives through a pull request or a direct push.",
      },
      {
        title: "Container smoke test",
        body: "Before pushing, CI starts the built image, waits for /health to answer, and asserts that the container is not running as root.",
      },
      {
        title: "Blue/green through CodeDeploy",
        body: "An image push starts CodePipeline, which registers a task definition and has CodeDeploy shift the load balancer to a replacement task set. Attached alarms can stop a cutover and roll it back.",
      },
      {
        title: "Least-privilege roles",
        body: "The execution role can read the one database secret; the task role can only read and write objects under photos/. Application code never holds a secret it was not injected with.",
      },
      {
        title: "No route to the internet",
        body: "Private route tables carry no default route. Tasks reach ECR, logs and S3 through VPC endpoints instead of a NAT gateway.",
      },
      {
        title: "Tests that pin decisions",
        body: "Unit tests run with no AWS account and no database, and two of them enforce structure: only the config module reads the environment, and the object key layout is defined in one place.",
      },
    ],
    challenges: [
      {
        title: "A stuck deployment after a database rebuild",
        body: "Rebuilding the database stack gives the secret a new ARN, but the committed task definition still names the old one. New tasks failed with an AccessDenied error rather than NotFound, because the execution role is scoped to the real secret, and the CodeDeploy deployment sat at 50% until it timed out. The fix was to regenerate the task definition from the one currently serving traffic and start the pipeline by hand.",
      },
      {
        title: "Reading failures from the service, not guessing",
        body: "Stopped-task reasons and the application log group separate four failure modes: secrets that cannot be pulled, an image that cannot be pulled, failed load balancer health checks, and a crashing container. Each points to a different fix.",
      },
      {
        title: "Gaps written down, not hidden",
        body: "The schema is created at container start rather than by a migration tool, the base image is pinned by tag rather than digest, and there is no rate limiting. Each is documented with the change that would close it.",
      },
    ],
    results: [
      "The application runs on ECS Fargate behind an Application Load Balancer, with images served from private S3 through CloudFront.",
      "Releases are triggered by an image push and rolled out blue/green by CodeDeploy, with alarms able to stop a bad cutover.",
      "There are no AWS access keys in either repository, and the test suite runs without AWS or a database.",
    ],
    technologies: [
      { label: "Application", items: ["Python", "PostgreSQL", "Docker"] },
      { label: "Compute & network", items: ["ECS Fargate", "Application Load Balancer", "ECR"] },
      { label: "Storage & delivery", items: ["RDS PostgreSQL", "Private S3", "CloudFront"] },
      { label: "Security", items: ["IAM", "Secrets Manager", "GitHub Actions OIDC"] },
      { label: "Delivery", items: ["GitHub Actions", "CodePipeline", "CodeDeploy", "CloudFormation"] },
    ],
  },
  {
    slug: "aureynx",
    index: "02",
    name: "Aureynx",
    kind: "Wildlife conservation platform",
    domain: "Full-stack product",
    summary:
      "A Django REST platform with a live React dashboard and an offline-first mobile app for low-connectivity field work.",
    tagline:
      "One backend serving two very different clients: a field app that has to keep working without a signal, and a dashboard that expects positions to arrive live.",
    code: "private",
    links: [],
    metrics: [
      { value: "137+", label: "automated tests" },
      { value: "Offline-first", label: "React Native field app with background sync" },
      { value: "LSTM · XGBoost", label: "behaviour and movement models" },
    ],
    focus: "End-to-end product architecture for low connectivity",
    problem: [
      "Conservation work happens in the field, where connectivity is unreliable. A platform for it has to keep capturing data and location when the network is gone, then reconcile with a central system once it returns.",
      "At the same time, people watching from a dashboard expect to see movement as it happens. The system has to hold both: delayed, offline data and live updates, in one consistent model.",
    ],
    approach: [
      {
        title: "One API as the source of truth",
        body: "A Django REST backend with PostgreSQL owns the data model and authentication for every client.",
      },
      {
        title: "Offline-first mobile",
        body: "The React Native app works against local state first and synchronises with the API in the background when connectivity allows.",
      },
      {
        title: "Live where it matters",
        body: "GPS updates reach the React dashboard over WebSockets, with Redis alongside the API, so tracking does not depend on polling.",
      },
      {
        title: "Models on the same data",
        body: "Movement data feeds machine learning models: behaviour classification and movement prediction using LSTM and XGBoost.",
      },
    ],
    architecture: {
      intro:
        "Every client talks to the same Django REST API. The mobile app syncs in the background, the dashboard receives live updates, and the models work from the same stored data.",
      diagram: aureynxDiagram,
    },
    implementation: [
      {
        title: "Background synchronisation",
        body: "Field data is captured locally and synchronised in the background, so the app does not depend on a request succeeding at the moment of capture.",
      },
      {
        title: "Live GPS tracking",
        body: "Location updates are pushed to the dashboard over WebSockets for live tracking.",
      },
      {
        title: "Authentication across clients",
        body: "The mobile app and the dashboard authenticate against the same backend.",
      },
      {
        title: "Behaviour and movement models",
        body: "LSTM and XGBoost models handle behaviour classification and movement prediction.",
      },
      {
        title: "Containerised services",
        body: "The backend services run in Docker for consistent local and deployed environments.",
      },
      {
        title: "137+ automated tests",
        body: "The platform is covered by more than 137 automated tests.",
      },
    ],
    challenges: [
      {
        title: "Designing for disconnection",
        body: "The mobile app cannot assume any request will succeed, so synchronisation has to run in the background and tolerate being interrupted and resumed.",
      },
      {
        title: "Live and offline in one model",
        body: "The dashboard expects live positions while field devices may be offline for long stretches. Real-time updates and delayed sync have to land in the same data without contradicting each other.",
      },
      {
        title: "Four layers, one product",
        body: "Backend, dashboard, mobile app and models each have their own constraints, and a change to the data model touches all of them. The automated test suite is what keeps that safe to change.",
      },
    ],
    results: [
      "A working platform spanning a Django REST backend, a React dashboard and an offline-first React Native app.",
      "Live GPS tracking over WebSockets and background synchronisation from the field.",
      "More than 137 automated tests, and ML behaviour classification and movement prediction with LSTM and XGBoost.",
    ],
    technologies: [
      { label: "Backend", items: ["Django REST Framework", "PostgreSQL", "Redis", "WebSockets"] },
      { label: "Clients", items: ["React", "React Native"] },
      { label: "Machine learning", items: ["LSTM", "XGBoost"] },
      { label: "Engineering", items: ["Docker", "Authentication", "Automated testing"] },
    ],
  },
  {
    slug: "chronic-disease",
    index: "03",
    name: "Chronic Disease Management System",
    kind: "Mobile app with ML inference",
    domain: "AI product",
    summary:
      "A Flutter mobile client backed by a FastAPI service that serves machine learning predictions.",
    tagline:
      "A trained model is only useful when someone can reach it. This system puts inference behind a REST API and a mobile app.",
    code: "private",
    links: [],
    metrics: [{ value: "85%", label: "model accuracy" }],
    focus: "Serving a model through a product",
    problem: [
      "Managing chronic disease depends on recognising risk early, which is hardest where access to healthcare is limited.",
      "A model in a notebook does not help anyone. The goal was to make a prediction available from a phone, through an API the model can sit behind.",
    ],
    approach: [
      {
        title: "Train",
        body: "Models built with TensorFlow and scikit-learn.",
      },
      {
        title: "Serve",
        body: "A FastAPI backend exposes inference through a REST API.",
      },
      {
        title: "Use",
        body: "A Flutter mobile client sends requests and presents the predictions.",
      },
    ],
    architecture: {
      intro:
        "The Flutter client sends a request to FastAPI, which runs inference and returns the prediction. MongoDB provides storage.",
      diagram: chronicDiagram,
    },
    implementation: [
      {
        title: "REST API flow",
        body: "The client and backend communicate through a REST API, keeping the mobile app independent of how predictions are made.",
      },
      {
        title: "Inference on the server",
        body: "Machine learning inference runs inside the FastAPI service using models built with TensorFlow and scikit-learn.",
      },
      {
        title: "MongoDB storage",
        body: "Application data is stored in MongoDB.",
      },
      {
        title: "Flutter client",
        body: "The mobile interface is built in Flutter.",
      },
    ],
    challenges: [
      {
        title: "Model and app on different lifecycles",
        body: "Keeping inference behind the API means the model can be retrained or replaced without shipping a new version of the mobile app.",
      },
    ],
    results: [
      "An end-to-end flow from mobile client to API to model and back.",
      "85% model accuracy.",
    ],
    technologies: [
      { label: "Backend", items: ["FastAPI", "REST", "MongoDB"] },
      { label: "Machine learning", items: ["TensorFlow", "scikit-learn"] },
      { label: "Client", items: ["Flutter"] },
    ],
  },
  {
    slug: "medical-qa",
    index: "04",
    name: "Medical Question-Answering System",
    kind: "Extractive question answering",
    domain: "NLP",
    summary:
      "Answers drawn from verified medical text with a fine-tuned DistilBERT, deployed on Hugging Face Spaces.",
    tagline:
      "In medicine, a fluent wrong answer is worse than no answer. This system only answers with text it can point to.",
    code: "public",
    links: [
      { label: "Live demo", href: "https://huggingface.co/spaces/Jammy142/Medical_Q-A_Chatbot" },
      { label: "Repository", href: "https://github.com/sjamillah/Medical_Q-A_Chatbot" },
    ],
    metrics: [{ value: "95.9%", label: "BERTScore" }],
    focus: "Model approach, evaluation and deployment",
    problem: [
      "A medical assistant that generates free text can produce answers that sound right and are false.",
      "Extractive question answering avoids that: every answer is a span taken directly from verified medical text, so it is grounded in a source by construction.",
    ],
    approach: [
      {
        title: "Extractive, not generative",
        body: "The model reads a question and a verified passage and predicts where the answer starts and ends inside that passage.",
      },
      {
        title: "DistilBERT",
        body: "A DistilBERT model fine-tuned with TensorFlow and Hugging Face Transformers.",
      },
      {
        title: "Evaluated on meaning",
        body: "Evaluation uses BERTScore, which compares answers by meaning rather than exact wording.",
      },
      {
        title: "Usable by anyone",
        body: "A Gradio interface deployed on Hugging Face Spaces.",
      },
    ],
    architecture: {
      intro:
        "The question and the verified passage go into DistilBERT together. The model returns the answer span, which the Gradio app displays.",
      diagram: medicalDiagram,
    },
    implementation: [
      {
        title: "Fine-tuning",
        body: "DistilBERT fine-tuned in TensorFlow using Hugging Face Transformers.",
      },
      {
        title: "Span extraction",
        body: "Answers are selected from the start and end positions the model predicts within the context.",
      },
      {
        title: "Gradio interface",
        body: "A simple question-and-answer interface built with Gradio.",
      },
      {
        title: "Hosted demo",
        body: "Deployed to Hugging Face Spaces so it can be tried without installing anything.",
      },
    ],
    challenges: [
      {
        title: "Choosing the right measure",
        body: "An extracted answer can be correct without matching the reference word for word, so a semantic measure, BERTScore, is used to judge answer quality.",
      },
    ],
    results: [
      "95.9% BERTScore.",
      "Publicly available as a live demo on Hugging Face Spaces.",
    ],
    technologies: [
      { label: "Model", items: ["DistilBERT", "TensorFlow", "Hugging Face Transformers"] },
      { label: "Evaluation", items: ["BERTScore"] },
      { label: "Deployment", items: ["Gradio", "Hugging Face Spaces"] },
    ],
  },
  {
    slug: "clinical-microscopy",
    index: "05",
    name: "Clinical Microscopy AI Analysis",
    kind: "Medical image classification",
    domain: "Computer vision",
    summary:
      "CNN transfer learning on microscopy images to detect malaria parasites and sickle cells.",
    tagline:
      "Applying transfer learning to blood microscopy, placed at two hackathons in consecutive years.",
    code: "private",
    links: [],
    metrics: [{ value: "72%", label: "accuracy" }],
    awards: [
      { place: "2nd Place", event: "Codextreme Hackathon", year: "2025" },
      { place: "3rd Place", event: "HSIL Hackathon", year: "2026" },
    ],
    focus: "Model approach, data preparation and evaluation",
    problem: [
      "Detecting malaria parasites and sickle cells in microscopy images is skilled, manual work.",
      "The project explores how a convolutional neural network can support that analysis.",
    ],
    approach: [
      {
        title: "Transfer learning",
        body: "A pretrained ResNet adapted to microscopy, rather than a network trained from scratch.",
      },
      {
        title: "Data first",
        body: "Dataset preprocessing and validation before training.",
      },
      {
        title: "Two conditions",
        body: "Detection of malaria parasites and of sickle cells.",
      },
    ],
    architecture: {
      intro:
        "Images are preprocessed and validated, then passed through a ResNet backbone adapted with transfer learning for the two detection tasks.",
      diagram: microscopyDiagram,
    },
    implementation: [
      {
        title: "Medical image processing",
        body: "Microscopy images are processed into a consistent input for the network.",
      },
      {
        title: "Dataset preprocessing and validation",
        body: "The dataset is prepared and validated before it is used for training.",
      },
      {
        title: "ResNet transfer learning",
        body: "A CNN built on a pretrained ResNet.",
      },
    ],
    challenges: [
      {
        title: "Data quality before model quality",
        body: "Preprocessing and validating the dataset comes first, because a model can only be as reliable as the images it learns from.",
      },
    ],
    results: [
      "72% accuracy.",
      "2nd Place at the Codextreme Hackathon 2025.",
      "3rd Place at the HSIL Hackathon 2026.",
    ],
    technologies: [
      { label: "Model", items: ["CNN", "ResNet", "Transfer learning"] },
      { label: "Data", items: ["Medical image processing", "Dataset preprocessing", "Validation"] },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

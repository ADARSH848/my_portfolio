from flask import Flask, jsonify, render_template


app = Flask(__name__)


PROFILE = {
    "name": "Adarsh Anand Karan",
    "role": "Robotics Engineer | AI and Autonomous Systems",
    "location": "Delhi, India",
    "email": "adarshkaran2002@gmail.com",
    "phone": "+91 8269214473",
    "linkedin": "https://linkedin.com/in/adarsh-anand-karan-116884261",
    "summary": (
        "Computer Science and Engineering student specializing in Artificial "
        "Intelligence and Robotics, building robot mechanisms, autonomous "
        "navigation stacks, dynamic simulations, and perception systems."
    ),
    "stats": [
        {"value": "1", "label": "Published patent"},
        {"value": "2", "label": "Research manuscripts"},
        {"value": "5", "label": "Robotics roles"},
        {"value": "12+", "label": "Technical certificates"},
    ],
    "education": [
        {
            "school": "Vellore Institute of Technology",
            "location": "Chennai, India",
            "program": (
                "Computer Science and Engineering, specializing in Artificial "
                "Intelligence and Robotics"
            ),
            "period": "Aug 2022 - May 2026",
        },
        {
            "school": "Jay Jyoti School",
            "location": "Rewa, India",
            "program": "CBSE Intermediate (12th)",
            "period": "2020",
        },
        {
            "school": "Jay Jyoti School",
            "location": "Rewa, India",
            "program": "CBSE 10th",
            "period": "2018",
        },
    ],
    "skills": [
        {
            "domain": "Programming",
            "items": ["Python", "C++", "Java", "C"],
            "focus": "Robotics software, AI pipelines, simulation scripts, and engineering tools.",
            "proof": "Used across solver logic, imitation learning experiments, perception prototypes, and robotics automation work.",
            "output": "Clean code that turns math, sensors, and robot behavior into usable systems.",
        },
        {
            "domain": "Robotics and Simulation",
            "items": ["ROS2", "ROS", "Gazebo", "PyBullet", "RViz", "Matlab"],
            "focus": "Robot modeling, validation, virtual testing, and simulation-led design.",
            "proof": "Built URDF workflows, Matlab trajectory validation, PyBullet locomotion experiments, and ROS2 navigation systems.",
            "output": "Simulation environments that reduce hardware risk before prototyping.",
        },
        {
            "domain": "Autonomous Systems",
            "items": ["SLAM", "Motion Planning", "Robot Control", "Navigation"],
            "focus": "Mapping, localization, path planning, robot control, and docking behavior.",
            "proof": "Applied through underwater navigation, medical docking bots, mobile docking mechanisms, and quadruped control research.",
            "output": "Robots that can sense, decide, move, and align with purpose.",
        },
        {
            "domain": "Hardware and Embedded",
            "items": [
                "Raspberry Pi",
                "Jetson Nano",
                "Wiring Harness Design",
                "Sensor Integration",
            ],
            "focus": "Sensor integration, embedded controllers, telemetry, and hardware-software interfaces.",
            "proof": "Built Arduino dispensing hardware, Formula Racing DAQ and telemetry, and multi-sensor robotics integrations.",
            "output": "Reliable physical prototypes where electronics and software work together.",
        },
        {
            "domain": "CAD and Mechanical Design",
            "items": ["SolidWorks", "Fusion 360", "Mechanism Design"],
            "focus": "Mechanical architecture, CAD modeling, mechanism design, and prototype-ready assemblies.",
            "proof": "Designed pipe inspection robot CAD, rural machine prototypes, competition concepts, and a patented docking robot mechanism.",
            "output": "Mechanisms designed for motion, manufacturability, and validation.",
        },
        {
            "domain": "Robotics Perception",
            "items": [
                "Machine Learning",
                "Deep Learning",
                "Computer Vision",
                "OpenCV",
                "TensorFlow",
                "Feature Extraction",
            ],
            "focus": "Computer vision, object tracking, image enhancement, feature extraction, and AI perception.",
            "proof": "Built OpenCV tracking systems, robotic arm vision integration, image classification, and edge detection workflows.",
            "output": "Perception modules that help robots interpret real-world scenes.",
        },
    ],
    "experience": [
        {
            "title": "Research and Development",
            "organization": "IIT Delhi",
            "period": "Dec 2025 - Present",
            "focus": "Rural machines, CAD prototyping, dynamic simulation",
            "details": [
                "Leading CAD design and prototyping of rural machines and mechanical devices.",
                "Running multi-body dynamic simulations to validate torque requirements and load capacities before prototyping.",
            ],
        },
        {
            "title": "Research Intern - Robotics",
            "organization": "IIT Delhi",
            "period": "May 2025 - Nov 2025",
            "focus": "Pipeline inspection robot",
            "details": [
                "Designed the full 3D CAD model of a pipe inspection robot in Fusion 360.",
                "Derived kinematic and dynamic models for robot motion and control.",
                "Created a URDF model and validated robot trajectories in Matlab.",
            ],
        },
        {
            "title": "Standalone Robotics Project",
            "organization": "IIT Kharagpur",
            "period": "Apr 2025 - Nov 2025",
            "focus": "Quadruped locomotion control and simulation",
            "details": [
                "Implemented imitation learning pipelines for quadruped locomotion in PyBullet.",
                "Reproduced and studied agile locomotion results from animal imitation research.",
                "Evaluated learned behaviors under simulation constraints.",
            ],
        },
        {
            "title": "Robotics Engineer Intern",
            "organization": "Mafkin Robotics",
            "period": "Sep 2024 - Feb 2025",
            "focus": "ROS2 SLAM and underwater navigation",
            "details": [
                "Developed ROS2-based SLAM pipelines for autonomous navigation.",
                "Implemented mapping and localization algorithms for underwater robotic systems.",
                "Integrated multi-sensor inputs for real-time perception and navigation.",
                "Optimized path planning algorithms for real-time navigation.",
            ],
        },
        {
            "title": "Electrical Engineer",
            "organization": "Shaurya X Formula Racing",
            "period": "Jul 2023 - Jul 2024",
            "focus": "Vehicle sensors, DAQ, and telemetry",
            "details": [
                "Designed and integrated electrical systems and sensors for vehicle communication.",
                "Built DAQ and telemetry systems for real-time monitoring and decisions.",
            ],
        },
    ],
    "projects": [
        {
            "name": "Omni-Directional Mobile Docking Robot",
            "type": "Patent",
            "category": "Mechanisms",
            "impact": "Indian Patent Application No. 202641044300, published Apr 2026.",
            "description": (
                "Novel omni-directional mobile base mechanism for automated docking "
                "and precision alignment."
            ),
            "tags": ["Patent", "Docking", "Mechanism Design", "Autonomy"],
            "visual": "docking",
        },
        {
            "name": "Pipe Inspection Robot",
            "type": "Research",
            "category": "Robotics",
            "impact": "CAD, dynamics, URDF, and trajectory validation workflow.",
            "description": (
                "Pipeline inspection platform combining mechanical design, dynamic "
                "modeling, and simulation-driven validation."
            ),
            "tags": ["Robot Dynamics", "Fusion 360", "URDF", "Matlab"],
            "visual": "pipe",
        },
        {
            "name": "AI-Assisted Telemedicine Kiosk",
            "type": "Product Prototype",
            "category": "AI Systems",
            "impact": "Voice-enabled healthcare workflow with hardware dispensing.",
            "description": (
                "NLP-driven symptom analysis using MiniLM, Arduino-based dispensing, "
                "and a Matlab Simscape digital twin."
            ),
            "tags": ["NLP", "Embedded", "Healthcare", "Digital Twin"],
            "visual": "kiosk",
        },
        {
            "name": "Quadruped Locomotion Imitation Learning",
            "type": "Research Simulation",
            "category": "AI Systems",
            "impact": "PyBullet experimentation with animal-imitation locomotion.",
            "description": (
                "Implemented and evaluated imitation learning pipelines for quadruped "
                "locomotion under simulated constraints."
            ),
            "tags": ["PyBullet", "Imitation Learning", "Control", "Simulation"],
            "visual": "quadruped",
        },
        {
            "name": "ROS2 Underwater Navigation Stack",
            "type": "Internship Build",
            "category": "Autonomy",
            "impact": "SLAM, mapping, localization, and path-planning optimization.",
            "description": (
                "Autonomous navigation pipeline for underwater robots with real-time "
                "multi-sensor perception."
            ),
            "tags": ["ROS2", "SLAM", "Navigation", "Sensors"],
            "visual": "navigation",
        },
        {
            "name": "BoreRobu Rescue Robot",
            "type": "Competition",
            "category": "Robotics",
            "impact": "Selected for Smart India Hackathon national semi-finals.",
            "description": (
                "Robotic rescue system with an assistive arm for borewell rescue scenarios."
            ),
            "tags": ["Robotic Arm", "Rescue", "SIH", "Prototype"],
            "visual": "arm",
        },
        {
            "name": "Medical Docking Bot",
            "type": "Competition",
            "category": "Autonomy",
            "impact": "Hack-4-Health robotics competition; won an internship opportunity.",
            "description": (
                "Autonomous bot with a docking system designed for medical device workflows."
            ),
            "tags": ["Docking", "Autonomous Bot", "Healthcare", "Competition"],
            "visual": "docking",
        },
        {
            "name": "Vision and Edge AI Prototypes",
            "type": "Applied AI",
            "category": "Perception",
            "impact": "Real-time tracking, feature extraction, and image classification builds.",
            "description": (
                "Robotic arm vision integration, OpenCV tracking, edge detection, "
                "sentiment analysis, and image classification models."
            ),
            "tags": ["OpenCV", "TensorFlow", "Tracking", "Classification"],
            "visual": "vision",
        },
    ],
    "research": [
        {
            "kind": "Patent",
            "title": "Omni-Directional Mobile Docking Robot",
            "status": "Published Apr 2026",
            "detail": (
                "Indian Patent Application No. 202641044300 for an automated docking "
                "and precision alignment mobile base mechanism."
            ),
        },
        {
            "kind": "Publication",
            "title": "Design and Implementation of an AI-Assisted Telemedicine Kiosk",
            "status": "Manuscript under preparation",
            "detail": "IEEE Transactions on Consumer Electronics.",
        },
        {
            "kind": "Publication",
            "title": "Design and Dynamic Modeling of a Pipe Inspection Robot",
            "status": "Manuscript under preparation",
            "detail": "Journal of Mechanisms and Robotics.",
        },
    ],
    "certificates": [
        "Smart India National Level Hackathon",
        "IIT BHU Ardubotics Robotics Competition and Workshop",
        "IIT Kharagpur Ethical Hacking Certificate",
        "IBM GEN AI Using IBM Watsonx",
        "Technex Design and Automotive Competition",
        "Python Programming by Tamil Nadu State Skill Development Program",
        "IIT Kanpur Conservation Economics",
        "Artificial Intelligence Certificate from Pantech",
        "Self Driving and ROS 2 Learn by Doing: Odometry and Control",
        "Self Driving and ROS 2 Learn by Doing: Map and Localization",
        "ROS for Beginners: Basics, Motion, and OpenCV",
        "ROS2 For Beginners",
        "Robotics and ROS 2: Manipulators",
    ],
}


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/profile")
def api_profile():
    return jsonify(PROFILE)


if __name__ == "__main__":
    app.run(debug=True)

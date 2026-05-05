from flask import Flask, jsonify, render_template, request


app = Flask(__name__)


PROFILE = {
    "name": "Adarsh Anand Karan",
    "role": "Robotics Engineer | AI and Autonomous Systems",
    "location": "Chennai, India",
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
            "strength": 91,
            "items": ["Python", "C++", "Java", "C"],
            "basis": (
                "CV-weighted estimate from repeated Python/C++ use across "
                "robotics, AI, simulation, and solver projects."
            ),
        },
        {
            "domain": "Robotics and Simulation",
            "strength": 95,
            "items": ["ROS2", "ROS", "Gazebo", "PyBullet", "RViz", "Matlab"],
            "basis": (
                "Highest score because your CV shows ROS2, PyBullet, Matlab, "
                "URDF, SLAM, and simulation work across multiple robotics roles."
            ),
        },
        {
            "domain": "Autonomous Systems",
            "strength": 92,
            "items": ["SLAM", "Motion Planning", "Robot Control", "Navigation"],
            "basis": (
                "Based on SLAM pipelines, localization, path planning, docking, "
                "quadruped control, and navigation-focused internship work."
            ),
        },
        {
            "domain": "Hardware and Embedded",
            "strength": 86,
            "items": [
                "Raspberry Pi",
                "Jetson Nano",
                "Wiring Harness Design",
                "Sensor Integration",
            ],
            "basis": (
                "Based on Raspberry Pi, Jetson Nano, Arduino hardware, vehicle "
                "telemetry, wiring, dispensing, and sensor integration mentions."
            ),
        },
        {
            "domain": "CAD and Mechanical Design",
            "strength": 89,
            "items": ["SolidWorks", "Fusion 360", "Mechanism Design"],
            "basis": (
                "Based on pipe inspection robot CAD, rural machine prototyping, "
                "mechanism design, and the omni-directional docking patent."
            ),
        },
        {
            "domain": "Robotics Perception",
            "strength": 88,
            "items": [
                "Machine Learning",
                "Deep Learning",
                "Computer Vision",
                "OpenCV",
                "TensorFlow",
                "Feature Extraction",
            ],
            "basis": (
                "Based on OpenCV tracking, image processing, feature extraction, "
                "classification models, and real-time perception work."
            ),
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


@app.route("/extract_variables", methods=["POST"])
def extract_variables():
    from core_runner import extract_var

    data = request.json
    solver = data.get("solver")
    equations_raw = data.get("equations")
    constants_raw = data.get("constants", "")

    try:
        equations_raw = equations_raw.strip()
        eq_blocks = [block.strip() for block in equations_raw.split("---")]
        equations = []

        for block in eq_blocks:
            lines = block.split("\n")
            for line in lines:
                clean = line.split("#", 1)[0].strip()
                if clean:
                    equations.append(clean)

        results = extract_var(solver, equations, constants_raw)
        output_str = ""
        for key in results:
            output_str += f"{key} = \n"

        return jsonify({"success": True, "solution": output_str})
    except Exception as exc:
        return jsonify({"success": False, "error": str(exc)})


@app.route("/solve", methods=["POST"])
def solve():
    from core_runner import solve_equations

    data = request.json
    solver = data.get("solver")
    equations_raw = data.get("equations")
    constants_raw = data.get("constants", "")
    initial_guesses = data.get("initial_guesses", "")

    try:
        equations_raw = equations_raw.strip()
        eq_blocks = [block.strip() for block in equations_raw.split("---")]
        equations = []

        for block in eq_blocks:
            lines = block.split("\n")
            for line in lines:
                clean = line.split("#", 1)[0].strip()
                if clean:
                    equations.append(clean)

        results = solve_equations(solver, equations, initial_guesses, constants_raw)
        return jsonify({"success": True, "solution": results["log"]})
    except Exception as exc:
        return jsonify({"success": False, "error": str(exc)})


if __name__ == "__main__":
    app.run(debug=True)

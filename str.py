import os

# ====== CONFIG ======
EXTENSION = ".txt"
STRUCTURE_FILENAME = f"Project_Structure{EXTENSION}"
CONTENT_FILENAME = f"Project_Codebase{EXTENSION}"

EXCLUDED_DIRS = {"node_modules", ".git", ".next", "assets"}
EXCLUDED_FILES = {"package-lock.json", ".env", "str.py"}
EXCLUDED_EXTENSIONS = {
    ".png",
    ".jpg",
    ".jpeg",
    ".svg",
    ".gif",
    ".webp",
    ".ico",
    ".riv",
    ".avif",
    ".pack",
    ".idx",
    ".ttf",
    ".ttc",
}
# =====================


def should_exclude(file):
    _, ext = os.path.splitext(file)
    return file in EXCLUDED_FILES or ext.lower() in EXCLUDED_EXTENSIONS


def generate_structure(path, depth=0):
    structure = ""
    try:
        for item in sorted(os.listdir(path)):
            if item in EXCLUDED_DIRS:
                continue
            item_path = os.path.join(path, item)
            if os.path.isdir(item_path):
                structure += "│   " * depth + "├── " + item + "/\n"
                structure += generate_structure(item_path, depth + 1)
            elif not should_exclude(item):
                structure += "│   " * depth + "├── " + item + "\n"
    except PermissionError:
        structure += "│   " * depth + "├── [Permission Denied]\n"
    return structure


def show_file_contents(path, output_file):
    if should_exclude(os.path.basename(path)):
        return
    try:
        with open(path, "r", encoding="utf-8") as f:
            content = f.read().strip()
        if not content:
            return
        foldername, filename = os.path.split(path)
        foldername = foldername.replace(os.path.sep, "/")
        output_file.write(f"{foldername}/{filename}\n")
        output_file.write("<DOCUMENT>\n")
        output_file.write(content + "\n")
        output_file.write("</DOCUMENT>\n\n")
    except Exception as e:
        print(f"Error reading file {path}: {e}")


def process_current_directory():
    base_path = os.getcwd()

    # Structure
    structure = generate_structure(base_path)
    with open(STRUCTURE_FILENAME, "w", encoding="utf-8") as f:
        f.write("Directory Structure:\n\n")
        f.write(structure)
    print(f"Project structure saved to {STRUCTURE_FILENAME}")

    # Codebase
    with open(CONTENT_FILENAME, "w", encoding="utf-8") as output_file:
        for root, dirs, files in os.walk(base_path):
            dirs[:] = [d for d in dirs if d not in EXCLUDED_DIRS]
            for file in files:
                if should_exclude(file):
                    continue
                file_path = os.path.join(root, file)
                show_file_contents(file_path, output_file)
    print(f"Project codebase saved to {CONTENT_FILENAME}")


if __name__ == "__main__":
    process_current_directory()

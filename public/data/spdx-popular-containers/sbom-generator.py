"""Generate dataset of container sboms with several tools.

Requires: grype, syft, docker, tern, and bom
"""

import csv
import json
import logging
import os
import subprocess
from pathlib import Path

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

# Get the script's directory
SCRIPT_DIR = Path(__file__).parent.absolute()
DATA_DIR = SCRIPT_DIR / "data"

def generate_syft_sbom(image, digest, output_filename):
    """Create and store a syft SBOM.

    Args:
        image (str) - image name, e.g. alpine
        digest (str) - the digest of the image, e.g. sha256:8914eb54f968791faf6a8638949e480fef81e697984fba772b3976835194c6d4
        output_filename (str) - path to a location for storing output

    Returns:
        Null
    """
    try:
        result = subprocess.run(
            [
                "syft",
                "packages",
                "-o",
                "spdx-json",
                "--file",
                output_filename,
                f"registry:{image}@{digest}",
            ],
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            check=True,
        )
        logging.info(f"Successfully generated Syft SBOM for {image}")
    except subprocess.CalledProcessError as e:
        logging.error(f"Failed to generate Syft SBOM for {image}: {e.output.decode()}")
        raise


def generate_trivy_sbom(image, digest, output_filename):
    """Create and store a trivy SBOM.

    Args:
        image (str) - image name, e.g. alpine
        digest (str) - the digest of the image, e.g. sha256:8914eb54f968791faf6a8638949e480fef81e697984fba772b3976835194c6d4
        output_filename (str) - path to a location for storing output

    Returns:
        Null
    """
    try:
        result = subprocess.run(
            [
                "trivy",
                "image",
                "--format",
                "spdx-json",
                "--output",
                output_filename,
                f"{image}@{digest}",
            ],
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            check=True,
        )
        logging.info(f"Successfully generated Trivy SBOM for {image}")
    except subprocess.CalledProcessError as e:
        logging.error(f"Failed to generate Trivy SBOM for {image}: {e.output.decode()}")
        raise


def generate_tern_sbom(image, digest, output_filename):
    """Create and store a tern SBOM.

    Args:
        image (str) - image name, e.g. alpine
        digest (str) - the digest of the image, e.g. sha256:8914eb54f968791faf6a8638949e480fef81e697984fba772b3976835194c6d4
        output_filename (str) - path to a location for storing output

    Returns:
        Null
    """
    try:
        # Pull the image first
        subprocess.run(
            ["docker", "pull", f"{image}@{digest}"],
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            check=True,
        )
        
        # Run tern
        cmd = f"docker run --rm -v /var/run/docker.sock:/var/run/docker.sock ternd report -f spdxjson -i {image}@{digest} > {output_filename}"
        subprocess.run(
            cmd,
            shell=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            check=True,
        )
        logging.info(f"Successfully generated Tern SBOM for {image}")
    except subprocess.CalledProcessError as e:
        logging.error(f"Failed to generate Tern SBOM for {image}: {e.output.decode()}")
        raise


def generate_bom_sbom(image, tag, output_filename):
    """Create and store a bom SBOM.

    Args:
        image (str) - image name, e.g. alpine
        tag (str) - the tag of the image, e.g. latest
        output_filename (str) - path to a location for storing output

    Returns:
        Null
    """
    try:
        result = subprocess.run(
            [
                "bom",
                "generate",
                "--format",
                "json",
                "--output",
                output_filename,
                "--image",
                # bom does not accept digests (yet)
                f"{image}:{tag}",
            ],
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            check=True,
        )
        logging.info(f"Successfully generated Bom SBOM for {image}")
    except subprocess.CalledProcessError as e:
        logging.error(f"Failed to generate Bom SBOM for {image}: {e.output.decode()}")
        raise


def generate_sboms(tool, image, tag, digest, output_filename):
    """Create and store SBOMs.

    Args:
        tool (str) - which sbom generation tool to be used
        tag (str) - image name, e.g. latest
        image (str) - image name, e.g. alpine
        digest (str) - the digest of the image, e.g. sha256:8914eb54f968791faf6a8638949e480fef81e697984fba772b3976835194c6d4
        output_file (str) - path to a location for storing output

    Returns:
        Null
    """
    if tool == "syft":
        generate_syft_sbom(image, digest, output_filename)
    elif tool == "trivy":
        generate_trivy_sbom(image, digest, output_filename)
    elif tool == "tern":
        generate_tern_sbom(image, digest, output_filename)
    elif tool == "bom":
        generate_bom_sbom(image, tag, output_filename)


def get_image_digest_and_tag(image):
    """Retrieve digest and tag of an image.

    Args:
        image (str) - image name, e.g. alpine

    Returns:
        digest (str) - digest of an image
        tag (str) - the tag used
    """
    try:
        # assume latest tag is available
        tag = "latest"

        result = subprocess.run(
            [
                "crane",
                "ls",
                image,
            ],
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            check=True,
        )
        tags = result.stdout.decode("utf-8")
        # if latest tag not available, grab tag
        # at end of crane ls command
        if "latest" not in tags:
            tag = tags.split("\n")[-2]

        result = subprocess.run(
            [
                "crane",
                "digest",
                f"{image}:{tag}",
            ],
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            check=True,
        )
        digest = result.stdout.decode("utf-8").strip("\n")
        logging.info(f"Found digest for {image}:{tag} -> {digest}")
        return digest, tag
    except subprocess.CalledProcessError as e:
        logging.error(f"Failed to get digest for {image}: {e.output.decode()}")
        raise


if __name__ == "__main__":
    # Create data directory if it doesn't exist
    DATA_DIR.mkdir(parents=True, exist_ok=True)

    sbom_format = "spdx"
    TOOLS = ["syft", "trivy"]  # Temporarily removing tern and bom as they need additional setup

    # read in list of most popular dockerhub images
    images = []
    csv_path = SCRIPT_DIR.parent / "most-popular-dockerhub-images.csv"
    
    if not csv_path.exists():
        logging.error(f"CSV file not found at {csv_path}")
        exit(1)

    logging.info(f"Reading images from {csv_path}")
    with open(csv_path) as csvfile:
        r = csv.reader(csvfile)
        r.__next__()  # skip first row, which is a header
        for row in r:
            images.append(row[0])

    logging.info(f"Found {len(images)} images to process")

    for image in images[::-1]:
        # outer try catches an error with getting digest and tag
        try: 
            digest, tag = get_image_digest_and_tag(image)
            
            for tool in TOOLS:
                # inner try catches error with generating an SBOM for a
                # particular tool
                try:
                    output_filename = DATA_DIR / f"{sbom_format}-{tool}-{image.replace('/', '_')}-{digest}.json"

                    # skip if this file already exists
                    if not output_filename.exists():
                        logging.info(f"Analyzing {image} with {tool}")
                        generate_sboms(tool, image, tag, digest, str(output_filename))
                    else:
                        logging.info(f"Skipping: {output_filename} already exists")
                except subprocess.CalledProcessError as e:
                    logging.error(f"Failed analyzing {image} with {tool}: {e.output.decode()}")
                except Exception as e:
                    logging.error(f"Unexpected error analyzing {image} with {tool}: {str(e)}")
        
        except subprocess.CalledProcessError as e:
            logging.error(f"Error using crane with {image}: {e.output.decode()}")
        except Exception as e:
            logging.error(f"Unexpected error processing {image}: {str(e)}")
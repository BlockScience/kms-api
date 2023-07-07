from warnings import filterwarnings
import google_crc32c
from google.cloud import secretmanager

# crc32c only called once on startup, so safe to ignore this warning I think
filterwarnings(
    "ignore",
    message="As the c extension couldn't be imported, `google-crc32c` is using a pure python implementation that is significantly slower. If possible, please configure a c build environment and compile the extension",
)


def access_secret_version(project: str, secret: str, version: str = "latest") -> str:
    """
    Access the payload for the given secret version if one exists. The version
    can be a version number as a string (e.g. "5") or an alias (e.g. "latest").
    """

    # Create the Secret Manager client.
    client = secretmanager.SecretManagerServiceClient()

    # Build the resource name of the secret version.
    name = f"projects/{project}/secrets/{secret}/versions/{version}"

    # Access the secret version.
    response = client.access_secret_version(request={"name": name})

    # Verify payload checksum.
    crc32c = google_crc32c.Checksum()
    crc32c.update(response.payload.data)
    if response.payload.data_crc32c != int(crc32c.hexdigest(), 16):
        print("Data corruption detected.")
        return response

    return response.payload.data.decode("UTF-8")

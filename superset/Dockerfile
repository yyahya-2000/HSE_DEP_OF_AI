FROM apache/superset
# Switching to root to install the required packages
USER root

RUN pip install psycopg2
RUN apt update && apt upgrade -y

COPY config.py /app/superset/config.py

# Switching back to using the `superset` user
USER superset
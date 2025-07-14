###############################################################################
# ---------- 1.  Build React front-end ----------------------------------------
###############################################################################
FROM node:20-bookworm AS frontend-build

# Public URL determines how CRA writes asset links.
# "."  → relative links   |  "/ibm-fullstack-capstone" → prefixed links
ARG PUBLIC_URL=.
ENV PUBLIC_URL=${PUBLIC_URL}

WORKDIR /app/frontend
# Install deps first so Docker layer is cached
COPY frontend/package*.json ./
RUN npm ci

# copy the rest of the React source and build it
COPY frontend/ ./
RUN npm run build          # outputs to /app/frontend/build

###############################################################################
# ---------- 2.  Build runtime Django image -----------------------------------
###############################################################################
FROM python:3.12-slim-bookworm AS runtime

ENV PYTHONBUFFERED=1 PYTHONWRITEBYTECODE=1
WORKDIR /app


# ----- Python dependencies ---------------------------------------------------
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# ----- Project source --------------------------------------------------------
COPY . .

# ----- Runtime metadata ------------------------------------------------------
EXPOSE 8000

COPY entrypoint.sh /app/	
RUN chmod +x /app/entrypoint.sh

ENTRYPOINT ["/bin/bash", "/app/entrypoint.sh"]
CMD ["gunicorn", "--bind", ":8000", "--workers", "3", "djangoproj.wsgi"]

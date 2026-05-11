export class ClientError extends Error {
  constructor(message = "Bad request") {
    super(message);
  }
}

export class ServerError extends Error {
  constructor(message = "Internal server error") {
    super(message);
  }
}

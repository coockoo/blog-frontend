export default class GraphQLError extends Error {
  constructor(errors, message) {
    super(message);
    this.name = this.constructor.name;
    this.errors = errors;
  }
}

class UserRepositoryInMemory {
  users = [];

  async findByEmail(email) {
    return this.users.find((user) => user.email === email);
  }

  async findById(user_id) {
    return this.users.find((user) => user.id === user_id);
  }

  async create(name, email, password) {
    const user = { id: this.users.length + 1, name, email, password };
    this.users.push(user);
    return { id: user.id };
  }

  async update(user_id, user) {
    const index = this.users.findIndex((user) => user.id === user_id);
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...user };
    }
  }

  async delete(user_id) {
    const index = this.users.findIndex((user) => user.id === user_id);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }
}

module.exports = UserRepositoryInMemory;

exports.up = knex => knex.schema.createTable("ordersDishes", table => {
  table.increments('id').primary()

  table.integer("dish_id").references("id").inTable("dishes").onDelete("CASCADE")
  table.integer("order_id").references("id").inTable("orders").onDelete("CASCADE")

  table.integer("quantity").notNullable()
})

exports.down = knex => knex.schema.dropTable("ordersDishes")

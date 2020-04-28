exports.up = function (knex) {
  return knex.schema
    .createTable("users", (tbl) => {
      tbl.increments("id");
      tbl.string("username", 40).unique().notNullable();
      tbl.string("password", 40).notNullable();
      tbl.string("email", 60).unique().notNullable();
      tbl.string("name", 100).notNullable();
      tbl.integer("age").notNullable();
      tbl.boolean("terms").defaultTo(false);
    })
    .createTable("posts", (tbl) => {
      tbl.increments("id");
      tbl.string("post").notNullable();
      tbl.string("caption", 250);
      tbl.timestamp("date").defaultTo(knex.fn.now());
      tbl.integer("user_id")
      .references("users.id")
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');
    })
    .createTable("comments", (tbl) => {
      tbl.increments("id");
      tbl.string("comment", 250).notNullable();
      tbl.timestamp("date").defaultTo(knex.fn.now());
      tbl.integer("post_id")
      .references("posts.id")
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');
    })
    .createTable("users_comments", (tbl) => {
      tbl.increments("id");
      tbl.integer("users_id")
      .references("users.id")
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');
      tbl
        .integer("comments_id")
        .references("comments.id")
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("users_comments")
    .dropTableIfExists("comments")
    .dropTableIfExists("posts")
    .dropTableIfExists("users");
};

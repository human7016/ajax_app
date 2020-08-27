class AddColumnToPosts < ActiveRecord::Migration[6.0]
  def change
    add_column :posts, :age, :integer
  end
end

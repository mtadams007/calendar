class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      
      t.string :title
      t.string :start
      t.string :end
      t.text :description
      t.date :date
      t.timestamps
    end
  end
end

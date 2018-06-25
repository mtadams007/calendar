# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


Event.create(title: "New Year's", start:'0:00', end:'23:59', description: "It's 2018!", date:"2018-01-01")
Event.create(title: "MLK Day", start:'3:00', end:'4:00', description: "Happy Birthday Martin Luther King!", date:"2018-01-15")
Event.create(title: "Independence Day", start:'3:00', end:'4:00', description: "Happy birthday America", date:"2018-07-04")
Event.create(title: "Get Hired", start:'3:00', end:'4:00', description: "Spotify hires Michael", date:"2018-07-13")
Event.create(title: "10 years!", start:'0:00', end:'11:59', description: "Spotify launched 10 years ago!", date:"2018-10-07")
Event.create(title: "Thanksgiving", start:'3:00', end:'4:00', description: "Let's eat turkey", date:"2018-11-22")
Event.create(title: "Christmas", start:'3:00', end:'4:00', description: "Holiday cheer to all", date:"2018-12-25")
Event.create(title: "Michael's Birthday", start:'3:00', end:'4:00', description: "I was born", date:"2018-12-29")

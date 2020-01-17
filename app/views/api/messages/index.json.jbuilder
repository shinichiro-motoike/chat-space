json.array! @messages do |message|
  json.content message.content
  json.image message.image.url
  json.created_at message.created_at.datetime.to_s
  json.user_name message.user.name
  json.id message.id
end
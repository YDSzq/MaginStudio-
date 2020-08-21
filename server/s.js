require 'faraday'
require 'json'
host = 'https://www.baklib.com/'

client = Faraday.new(url: host) do |conn|
  conn.headers['Authorization'] = "Bearer #{token}"
  conn.headers['Content-Type'] = 'application/json'
  conn.adapter :net_http
end
params = {
  tenant_id: "#{tenant_id}",
  name: 'Ruby的历史',
  channel_id: "#{channel_id}",
  tag_list: ['Ruby', 'Ruby历史'],
  status: 0
}
response = client.post("/api/v1/articles", params.to_json)
JSON.parse(response.body)
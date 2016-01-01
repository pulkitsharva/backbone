# encoding: UTF-8

get '/api/recruiter' do
  format_response(Recruiter.all, request.accept)
end

get '/api/recruiter/:id' do
  recruiter ||= Recruiter.get(params[:id]) || halt(404)
  format_response(recruiter, request.accept)
end

delete '/api/recruiter/:id' do
  recruiter ||= Recruiter.get(params[:id]) || halt(404)
  candidate ||= Candidate.all(Candidate.recruiter.id => params[:id]) || halt(404)
  logger.info candidate.destroy
  logger.info recruiter.destroy
end

post '/api/recruiter' do
  
  body = JSON.parse request.body.read
  recruiter = Recruiter.create(
    name:    body['name'],
    location: body['location']
  )
  status 201
  format_response(recruiter, request.accept)
end

put '/api/recruiter/:id' do
  body = JSON.parse request.body.read
  recruiter = Recruiter.get(body['id'])
  recruiter.update(
	  name:    body['name'],
	  location: body['location']
  )
  format_response(recruiter, request.accept)
end




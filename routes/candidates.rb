get '/api/candidate/recruiter/:recruiterId' do
  candidate ||= Candidate.all(Candidate.recruiter.id => params[:recruiterId]) || halt(404)
  format_response(candidate, request.accept)
end

get '/api/candidate/:id' do
  candidate ||= Candidate.get(params[:id]) || halt(404)
  format_response(candidate, request.accept)
end

get '/api/candidate' do
  format_response(Candidate.all, request.accept)
end

post '/api/candidate' do
  
  body = JSON.parse request.body.read
  recruiter=Recruiter.get(body['recruiter_id'])
  candidate = Candidate.create(
    name:    body['name'],
    recruiter: recruiter
  )
  status 201
  format_response(candidate, request.accept)
end

put '/api/candidate' do
  body = JSON.parse request.body.read
  recruiter=Recruiter.get(body['recruiter_id'])
  candidate = Candidate.create(
    name:    body['name'],
    recruiter: recruiter
  )
  status 201
  format_response(candidate, request.accept)
end


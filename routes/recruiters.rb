# encoding: UTF-8

get '/api/recruiters' do
  format_response(Recruiter.all, request.accept)
end


# encoding: UTF-8
class Candidate
  include DataMapper::Resource

  property :id,         Serial, :key => true
  property :name,      String
  belongs_to :recruiter, :model => 'Recruiter'
end

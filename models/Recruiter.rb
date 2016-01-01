# encoding: UTF-8
class Recruiter
  include DataMapper::Resource

  property :id,         Serial, :key => true
  property :name,      String
  property :location, String
  has n, :candidates
end

# encoding: UTF-8
require 'json'
require 'sinatra'
require 'data_mapper'
require 'dm-migrations'
require 'sinatra/cross_origin'

configure :development do
  enable :cross_origin
  DataMapper::Logger.new($stdout, :debug)
  DataMapper.setup(
    :default,
    'mysql://root:@localhost/hackerrank'
  )
end

get '/' do
  File.read(File.join('public', 'index.html'))
end

require './models/init'
require './helpers/init'
require './routes/init'

DataMapper.finalize

# encoding: UTF-8
require 'json'
require 'sinatra'
require 'data_mapper'
require 'dm-migrations'
require 'sinatra/cross_origin'
require 'logger'
  configure :development do
    set :haml, { :ugly=>true }
    set :clean_trace, true

    Dir.mkdir('logs') unless File.exist?('logs')

    $logger = Logger.new('logs/common.log','weekly')
    $logger.level = Logger::WARN

    # Spit stdout and stderr to a file during production
    # in case something goes wrong
    $stdout.reopen("logs/output.log", "w")
    $stdout.sync = true
    $stderr.reopen($stdout)
  end

  configure :development do
    $logger = Logger.new(STDOUT)
  end

configure :production do
  enable :cross_origin
  DataMapper::Logger.new($stdout, :debug)
  DataMapper.setup(
    :default,
    'mysql://xxxx:xxxx@127.5.51.2/hackerrank'
  )
end

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

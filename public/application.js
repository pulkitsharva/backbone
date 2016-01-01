function htmlEncode(value) {
    return $('<div/>').text(value).html();
}

$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
$.ajaxPrefilter(function(options, originalOptions, jqXHR) {
    options.url = 'http://localhost:4567/api' + options.url;
});


var Candidates = Backbone.Collection.extend({
    url: '/candidate'
});
var Candidate = Backbone.Model.extend({
    urlRoot: '/candidate'
});
var Recruiters = Backbone.Collection.extend({
    url: '/recruiter'
});
var Recruiter = Backbone.Model.extend({
    urlRoot: '/recruiter'
});

var Homepage = Backbone.View.extend({
    el: '.page',
    render: function() {
        var that = this;
        var template = _.template($('#homepage-template').html(), {});
        this.$el.html(template);
    }
});
var CandidateList = Backbone.View.extend({
    el: '.page',
    render: function() {
        var that = this;
        var candidates = new Candidates();
        candidates.fetch({
            success: function(candidates) {
                var template = _.template($('#candidate-list-template').html(), {
                    candidates: candidates.models
                });
                that.$el.html(template);
            }
        })
    }
});
var RecruiterList = Backbone.View.extend({
    el: '.page',
    render: function() {
        var that = this;
        var recruiters = new Recruiters();
        recruiters.fetch({
            success: function(recruiters) {
                var template = _.template($('#recruiter-list-template').html(), {
                    recruiters: recruiters.models
                });
                that.$el.html(template);
            }
        })
    }
});
var CandidateEditView = Backbone.View.extend({
    el: '.page',
    render: function(options) {
        var that = this;
        if (options) {
            that.candidate = new Candidate({
                id: options.id
            });
            that.candidate.fetch({
                success: function(candidate) {
                    var template = _.template($('#edit-candidate-template').html(), {
                        candidate: candidate
                    });
                    that.$el.html(template);
                }
            })
        } else {
            var template = _.template($('#edit-candidate-template').html(), {
                candidate: null
            });
            this.$el.html(template);
        }
    },
    events: {
        'submit .edit-candidate-form': 'saveCandidate'
    },
    saveCandidate: function(ev) {
        var candidateDetails = $(ev.currentTarget).serializeObject();
        var candidate = new Candidate();
        candidate.save(candidateDetails, {
            contentType: "application/json",
            success: function(candidate) {
                router.navigate('candidate', {
                    trigger: true
                });
            }
        });
        return false;
    }
});
var RecruiterEditView = Backbone.View.extend({
    el: '.page',
    render: function(options) {
        var that = this;
        if (options) {
            that.recruiter = new Recruiter({
                id: options.id
            });
            that.recruiter.fetch({
                success: function(recruiter) {
                    var template = _.template($('#edit-recruiter-template').html(), {
                        recruiter: recruiter
                    });
                    that.$el.html(template);
                }
            })
        } else {
            var template = _.template($('#edit-recruiter-template').html(), {
                recruiter: null
            });
            this.$el.html(template);
        }
    },
    events: {
        'submit .edit-recruiter-form': 'saveRecruiter'
    },
    saveRecruiter: function(ev) {
        var recruiterDetails = $(ev.currentTarget).serializeObject();
        var recruiter = new Recruiter();
        recruiter.save(recruiterDetails, {
            contentType: "application/json",
            success: function(recruiter) {
                router.navigate('recruiter', {
                    trigger: true
                });
            }
        });
        return false;
    }
});
var homepage = new Homepage();
var candidateList = new CandidateList();
var candidateEditView = new CandidateEditView();
var recruiterList = new RecruiterList();
var recruiterEditView = new RecruiterEditView();

var Router = Backbone.Router.extend({
    routes: {
        '': 'home',
        'candidate': 'candidate',
        'candidate/new': 'candidate_new',
        'candidate/edit/:id': 'candidate_edit',
        'recruiter': 'recruiter',
        'recruiter/new': 'recruiter_new',
        'recruiter/edit/:id': 'recruiter_edit'

    }
});

var router = new Router;
router.on('route:home', function() {
    homepage.render();

})
router.on('route:candidate', function() {
    candidateList.render();

})
router.on('route:candidate_new', function() {
    candidateEditView.render();

})
router.on('route:candidate_edit', function(id) {
    candidateEditView.render({
        id: id
    });
})
router.on('route:recruiter', function() {
    recruiterList.render();

})
router.on('route:recruiter_new', function() {
    recruiterEditView.render();

})
router.on('route:recruiter_edit', function(id) {
    recruiterEditView.render({id: id});
})

Backbone.history.start();
const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema (
    {
        name: {
            type: String,
            required: [true, 'Submitter name required.' ]
        }, 
        email: {
            type: String,
            required: [true, 'Submitter email required.' ]
        }, 
        projectDescription: {
            type: String,
            required: [true, 'Project description required.' ]
        },
        projectName: {
            type: String
        }
    }
)

submissionSchema.post('save', function (submission) {
    if(!submission.projectName) {
        submission.projectName = submission._id
        submission.save()
    }
  });

module.exports = mongoose.model ('Submission', submissionSchema);
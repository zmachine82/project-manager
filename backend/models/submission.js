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
        }
    }
)

module.exports = mongoose.model ('Submission', submissionSchema);
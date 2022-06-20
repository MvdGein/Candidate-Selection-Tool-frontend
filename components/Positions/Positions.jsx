import React from 'react';
import { RecruitmentProcess } from 'Components/RecruitmentProcess';
// import { ApplyApplicantForm } from 'Components/ApplyApplicantForm';

const Positions = () => (
    <div>
        <RecruitmentProcess vacancy_id={vacancy_id} candidate_id={candidate_id} />
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '3rem 0' }}>
            <ApplyApplicantForm />
        </div>
    </div>
);

export default Positions; 
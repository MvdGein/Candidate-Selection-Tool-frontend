import React from 'react';
import { BrowserRouter, Routes as Switch, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { HeaderEnterprise } from 'Components/Header';
import { ScrollToTop } from 'Components/ScrollTop';

import { Loader } from 'Components/Loader';
import { RecruitmentHome } from 'Pages/RecruitmentHome';
// import { CreateVacancies } from 'Pages/CreateVacancies';
import { EditVacancies } from 'Pages/EditVacancies';
// import { InterviewPlanning } from 'Pages/InterviewPlanning';
import { VacanciesHistory } from 'Pages/VacanciesHistory';
import { ListCandidatesVacancies } from 'Pages/ListCandidatesVacancies';
import { ApplicationOverview } from 'Pages/ApplicationOverview';
import { StatusDetail } from 'Pages/StatusDetail';
import { Status } from 'Pages/Status';
import Positions from 'Pages/Positions';
import { NotFound } from 'Pages/NotFound';
import Candidate from 'Pages/Candidate';

const Routes = () => {
    const { isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <Loader />;
    }

    return (
        <BrowserRouter>
            <HeaderEnterprise />
            {isAuthenticated ? (
                <Switch>
                    <Route path="/" element={<RecruitmentHome />} />
                    <Route path="/vacancies" element={<VacanciesHistory />} />
                    <Route path="/vacancies/:id/edit" element={<EditVacancies />} />
                    <Route path="/vacancies/:id" element={<ListCandidatesVacancies />} />
                    <Route path="/interviews" element={<ApplicationOverview />} />
                    <Route path="/postulations" element={<Status />} />
                    <Route path="/postulants/:status/:id" element={<StatusDetail />} />
                    <Route path="*" element={<NotFound />} />
                </Switch>
            ) : (
                <Switch>
                    <Route path="/" element={<Positions />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="/:candidateId" element={<Candidate />} />
                </Switch>
            )}
            <ScrollToTop />
        </BrowserRouter>
    );
};

export default Routes;
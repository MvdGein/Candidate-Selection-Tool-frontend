 import React, { useState, useEffect } from 'react';
 import Container from '@mui/material/Container';
 import { useParams } from 'react-router-dom';

 import { CandidateEvaluationRate } from 'Components/CandidateEvaluationRate';
 import CandidateFormTabs from 'Components/CandidateFormTabs';
 import { NotFound } from './NotFound';
 import api from '../services/api';

// Tabs
import { Reviews } from '../components/Reviews';
import { OverviewModel } from '../components/OverviewModel';
import { Overview } from '../components/Overview';
import { CardCandidateOverview } from '../components/CardCandidateOverview';

const Candidate = () => {
    const { candidateId } = useParams();

    const [reload, setReload] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState();

    useEffect(() => {
        api.candidateRaiting
            .getData(candidateId)
            .then((response) => response.json())
            .then((result) => {
                setIsLoaded(true);
                setData(result.data);
            })
            .catch(() => {
                setIsLoaded(true);
                setError(true);
            });
    }, [candidateId, reload]);

    if (!isLoaded) {
        return <div>Een ogenblik...</div>;
    }

    return error || !data?.candidate_information ? (
        <NotFound noData />
    ) : (
        <Container>
            <CandidateEvaluationRate data={data} handleReload={() => setReload(!reload)} />
            <CandidateFormTabs
                tabsOptions={[
                    { tabKey: 'Overview', tabContent: <Overview info={data} /> },
                    {
                        tabKey: 'Reviews',
                        tabContent: <Reviews info={data} handleReload={() => setReload(!reload)} reload={reload} />,
                    },
                    { tabKey: 'Model', tabContent: <OverviewModel info={data} handleReload={() => setReload(!reload)} reload={reload} />,
                    },
                    { tabKey: 'Details', tabContent: <CardCandidateOverview data={data} />},
                ]}
            />
        </Container>
    );
};

export default Candidate; 
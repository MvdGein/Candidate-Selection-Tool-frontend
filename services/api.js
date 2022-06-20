import config from '../config';
import list from '../data/listReviews';
import overallReviews from '../data/overallReviews';
import { countries } from '../data/countries'

const getData = (endpoint, options) => {
  const ops = {
    headers: config.headers,
    ...options
  };

  const url = `${config.api}${endpoint}`;
  return fetch(url, ops)
};

const sendData = (endpoint, data) => {
  const url = `${config.api}${endpoint}`;

  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: config.headers
  });
}

const api = {
  candidateRaiting: {
    getData(candidateId) {
      return getData(`candidates/${candidateId}/ratings`);
    },
  },
  candidateEvaluations: {
    listReviews(candidateId, page, queries, options = {}) {
      return getData(`candidates/${candidateId}/candidate-evaluations?page=${page}&size=10${queries}`, options);
    },
    sendReview(candidateId, data = {}) {
      return sendData(`candidates/${candidateId}/candidate-evaluation`, data);
    },
    mockDataList() {
      return list.map((review) => ({
        id: review.id,
        contentType: review.content_type,
        createdAt: review.created_at,
        jobTitle: review.job_title,
        utilityCounter: review.utility_counter,
        weightedAveragePerEvaluation: review.rating,
      }));
    },
    mockDataOverallReview() {
      return new Promise(resolve => resolve(...overallReviews));
    }
  },
  applicantReview: {
    sendReview(candidateId, data = {}) {
      return sendData(`candidates/${candidateId}/applicant-evaluation`, data);
    },
  },
  applicantRegistration: {
    mockDataCountries(){
      return new Promise(resolve => resolve(countries))
    },
    sedApplicantData(applicantData){
      return sendData('applicants', applicantData);
    }
  }
};

export default api;

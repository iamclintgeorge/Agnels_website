import React, { useState, useEffect } from "react";
import axios from "axios";

// Admission Process Component

export const AdmissionPro = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3663/api/admissions/sections/admission_process"
      );
      console.log("Fetched admission process content:", response.data);
      
      const apiContent = response.data?.content;
      if (apiContent && Object.prototype.hasOwnProperty.call(apiContent, "content")) {
        setContent(apiContent.content || "");
      } else {
        // Fallback content if API fails
        setContent(`Ever since its inception, Fr. C. Rodrigues Institute of Technology, Vashi has established itself as one of the leading Engineering Colleges in Mumbai nurturing quality education, supported by its excellent results in the University examinations.

Our College has been granted "Christian Religious Minority" status by the Government of Maharashtra, and 51% of total seats for the Undergraduate and Masters Program in each branch are reserved for candidates belonging to the 'Christian Religion.'

Admission Enquiry call Mobile No: +91 9769764884

Registration Forms:
- D.S.E Mumbai University Enrollment/Registration Form: https://mumoa.digitaluniversity.ac/Register
- F.E Mumbai University Enrollment/Registration Form: https://mu.samarth.ac.in/index.php/academic
- F.E/ D.S.E. Anti Ragging Registration Form: https://www.antiragging.in/affidavit_affiliated_form.php

Programs and Intake Capacity:
Undergraduate Programs (B.Tech):
- Computer Engineering: 120
- Mechanical Engineering: 120
- Electronics and Telecommunication Engineering: 60
- Electrical Engineering: 60
- Computer Science and Engineering (Prev. IT): 60

Post Graduate Programs: Masters in Technology (M.Tech)
- Mechanical Engineering: 18
- Electrical Engineering: 09

PhD Programs:
- Mechanical Engineering: 25
- Electrical Engineering: 20
- Electronics and Telecommunication Engineering: 10`);
      }
    } catch (error) {
      console.error("Error fetching admission process content:", error);
      // Set fallback content on error
      setContent(`Ever since its inception, Fr. C. Rodrigues Institute of Technology, Vashi has established itself as one of the leading Engineering Colleges in Mumbai nurturing quality education, supported by its excellent results in the University examinations.

Our College has been granted "Christian Religious Minority" status by the Government of Maharashtra, and 51% of total seats for the Undergraduate and Masters Program in each branch are reserved for candidates belonging to the 'Christian Religion.'

Admission Enquiry call Mobile No: +91 9769764884

Registration Forms:
- D.S.E Mumbai University Enrollment/Registration Form: https://mumoa.digitaluniversity.ac/Register
- F.E Mumbai University Enrollment/Registration Form: https://mu.samarth.ac.in/index.php/academic
- F.E/ D.S.E. Anti Ragging Registration Form: https://www.antiragging.in/affidavit_affiliated_form.php

Programs and Intake Capacity:
Undergraduate Programs (B.Tech):
- Computer Engineering: 120
- Mechanical Engineering: 120
- Electronics and Telecommunication Engineering: 60
- Electrical Engineering: 60
- Computer Science and Engineering (Prev. IT): 60

Post Graduate Programs: Masters in Technology (M.Tech)
- Mechanical Engineering: 18
- Electrical Engineering: 09

PhD Programs:
- Mechanical Engineering: 25
- Electrical Engineering: 20
- Electronics and Telecommunication Engineering: 10`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen font-sans">
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
      <div className="mb-8">
        <h1 className="text-5xl font-light text-black mb-3 heading-premium">
          Admission Process
        </h1>
      </div>

      <div
        className="text-lg text-gray-800 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

// Undergraduate Admissions Component
export const UnderG = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3663/api/admissions/sections/admission_undergraduate"
      );
      console.log("Fetched undergraduate content:", response.data);
      
      const apiContent = response.data?.content;
      if (apiContent && Object.prototype.hasOwnProperty.call(apiContent, "content")) {
        setContent(apiContent.content || "");
      } else {
        // Fallback content
        setContent(`80% seats of the sanctioned intake are admitted through the centralized process, while the remaining 20% are admitted at Institute level.

51% of the centralized admission seats are under Minority Quota.

Centralized Admission Process:
Eligibility: As per the Directives of the DTE/ Competent Authority/ Regulatory Authority.

The aspiring candidates must apply online through the CET Cell. Rules and Schedules for the Admission Rounds would be as per the Directives of DTE/ Competent Authority/ Regulatory Authority.

After the allotment of the seat by DTE, the candidates must report to the ARC and the respective institute for confirmation of the admission.

Institute Level Admission:
Eligibility: Same as the Centralized Admission.

The candidates must possess a valid CAP Merit number. The aspiring candidates must separately apply to the Institute for admission under this quota.

Direct Second Year Admissions:
Students seeking admission to the second year of the undergraduate programs through the Institute must fulfill the eligibility criteria as per DTE norms.`);
      }
    } catch (error) {
      console.error("Error fetching undergraduate content:", error);
      setContent(`80% seats of the sanctioned intake are admitted through the centralized process, while the remaining 20% are admitted at Institute level.

51% of the centralized admission seats are under Minority Quota.

Centralized Admission Process:
Eligibility: As per the Directives of the DTE/ Competent Authority/ Regulatory Authority.

The aspiring candidates must apply online through the CET Cell. Rules and Schedules for the Admission Rounds would be as per the Directives of DTE/ Competent Authority/ Regulatory Authority.

After the allotment of the seat by DTE, the candidates must report to the ARC and the respective institute for confirmation of the admission.

Institute Level Admission:
Eligibility: Same as the Centralized Admission.

The candidates must possess a valid CAP Merit number. The aspiring candidates must separately apply to the Institute for admission under this quota.

Direct Second Year Admissions:
Students seeking admission to the second year of the undergraduate programs through the Institute must fulfill the eligibility criteria as per DTE norms.`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen font-sans">
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extralight text-black mb-3 heading-premium">
          Undergraduate Admissions
        </h1>
      </div>

      <div
        className="text-lg text-gray-800 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export const PostG = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3663/api/admissions/sections/admission_postgraduate"
      );
      console.log("Fetched postgraduate content:", response.data);
      
      const apiContent = response.data?.content;
      if (apiContent && Object.prototype.hasOwnProperty.call(apiContent, "content")) {
        setContent(apiContent.content || "");
      } else {
        setContent(`Allotment of Seats for the Masters Program would be done through the centralized process.

51% of the centralized admission seats are under Minority Quota.

Eligibility & Admission Process:
- Eligibility: As per the Directives of the DTE/ Competent Authority/ Regulatory Authority.
- Rules and Schedules for the Admission Rounds would be as per the Directives of DTE/ Competent Authority/ Regulatory Authority.
- The distribution of seats for Admissions and the Admission process under Minority Seats (Institute level seats / CAP Seats) is as notified by DTE / ARA / Govt. Of Maharashtra.
- Candidates with a valid Gate Score would be eligible for Stipend as per the norms of the Regulatory Authority.`);
      }
    } catch (error) {
      console.error("Error fetching postgraduate content:", error);
      setContent(`Allotment of Seats for the Masters Program would be done through the centralized process.

51% of the centralized admission seats are under Minority Quota.

Eligibility & Admission Process:
- Eligibility: As per the Directives of the DTE/ Competent Authority/ Regulatory Authority.
- Rules and Schedules for the Admission Rounds would be as per the Directives of DTE/ Competent Authority/ Regulatory Authority.
- The distribution of seats for Admissions and the Admission process under Minority Seats (Institute level seats / CAP Seats) is as notified by DTE / ARA / Govt. Of Maharashtra.
- Candidates with a valid Gate Score would be eligible for Stipend as per the norms of the Regulatory Authority.`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen font-sans">
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extralight text-black mb-3 heading-premium">
          Post Graduate Admissions
        </h1>
      </div>

      <div
        className="text-lg text-gray-800 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export const PhD = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3663/api/admissions/sections/admission_phd"
      );
      console.log("Fetched PhD content:", response.data);
      
      const apiContent = response.data?.content;
      if (apiContent && Object.prototype.hasOwnProperty.call(apiContent, "content")) {
        setContent(apiContent.content || "");
      } else {
        setContent(`Application Form for PhD: Please check the institute website or advertisements in the newspapers for the application form.

List of Required Documents:
- Completed Application Form
- Photocopy of Bachelor's Degree
- Valid GATE/PET Scorecard
- Proof of Identity
- Passport-size Photograph

Eligibility:
- Candidate must be an Indian National possessing a Bachelor's Degree in the respective/related fields of Engineering.
- Candidates must possess a valid GATE/PET Score.
- Applications are invited by advertisement in the newspapers and the institute website.
- After scrutinizing the applications, call letters are sent to the candidates.
- The candidates are selected based on the inter-se merit of the PET Score and the Technical Interview.`);
      }
    } catch (error) {
      console.error("Error fetching PhD content:", error);
      setContent(`Application Form for PhD: Please check the institute website or advertisements in the newspapers for the application form.

List of Required Documents:
- Completed Application Form
- Photocopy of Bachelor's Degree
- Valid GATE/PET Scorecard
- Proof of Identity
- Passport-size Photograph

Eligibility:
- Candidate must be an Indian National possessing a Bachelor's Degree in the respective/related fields of Engineering.
- Candidates must possess a valid GATE/PET Score.
- Applications are invited by advertisement in the newspapers and the institute website.
- After scrutinizing the applications, call letters are sent to the candidates.
- The candidates are selected based on the inter-se merit of the PET Score and the Technical Interview.`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen font-sans">
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extralight text-black mb-3 heading-premium">
          PhD Admissions
        </h1>
      </div>

      <div
        className="text-lg text-gray-800 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export const Fees = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3663/api/admissions/sections/admission_fee_payment"
      );
      console.log("Fetched fee payment content:", response.data);
      
      const apiContent = response.data?.content;
      if (apiContent && Object.prototype.hasOwnProperty.call(apiContent, "content")) {
        setContent(apiContent.content || "");
      } else {
        setContent(`Please proceed with the fee payment by clicking the button below:

Pay Fees: https://www.eduqfix.com/PayDirect/#/student/pay/XxoRsO6mfiXGAnQY1R64lGgQcWtw4tYKPWYLPO8nzoGBvtL6DIe+F9YjQMK1keFr/254`);
      }
    } catch (error) {
      console.error("Error fetching fee payment content:", error);
      setContent(`Please proceed with the fee payment by clicking the button below:

Pay Fees: https://www.eduqfix.com/PayDirect/#/student/pay/XxoRsO6mfiXGAnQY1R64lGgQcWtw4tYKPWYLPO8nzoGBvtL6DIe+F9YjQMK1keFr/254`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen font-sans">
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex flex-col items-center justify-center font-sans">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extralight text-gray-900 mb-6 heading-premium">
          Fee Payment
        </h1>
      </div>

      <div
        className="text-lg text-gray-800 leading-relaxed text-center"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

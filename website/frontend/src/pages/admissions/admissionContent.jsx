import React from "react";

// Admission Process Component

    export const AdmissionPro = () => {
      return (
        <div className="p-8 bg-gray-50 min-h-screen font-sans">
          <div className="mb-8">
            <h1 className="text-5xl font-light text-black mb-3 heading-premium">Admission Process</h1>
            <p className="text-lg text-gray-700">
              <strong>Admission Enquiry call Mobile No:</strong> 
              <span className="text-blue-600"> +91 9769764884</span>
            </p>
          </div>
    
          {/* Registration Forms Section */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 heading-premium">Registration Forms</h2>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <ul className="space-y-4 text-lg text-gray-700">
                <li>
                  <a href="https://mumoa.digitaluniversity.ac/Register" className="text-blue-600 hover:underline">
                    D.S.E Mumbai University Enrollment/Registration Form
                  </a>
                </li>
                <li>
                  <a href="https://mu.samarth.ac.in/index.php/academic" className="text-blue-600 hover:underline">
                    F.E Mumbai University Enrollment/Registration Form
                  </a>
                </li>
                <li>
                  <a href="https://www.antiragging.in/affidavit_affiliated_form.php" className="text-blue-600 hover:underline">
                    F.E/ D.S.E. Anti Ragging Registration Form
                  </a>
                </li>
              </ul>
            </div>
          </div>
    
          {/* Description Section */}
          <div className="mb-8">
            <p className="text-lg text-gray-800 leading-relaxed">
              Ever since its inception, Fr. C. Rodrigues Institute of Technology, Vashi has 
              established itself as one of the leading Engineering Colleges in Mumbai nurturing 
              quality education, supported by its excellent results in the University examinations.
            </p>
            <p className="text-lg text-gray-800 leading-relaxed mt-6">
              Our College has been granted <strong>“Christian Religious Minority”</strong> status 
              by the Government of Maharashtra, and 51% of total seats for the Undergraduate and 
              Masters Program in each branch are reserved for candidates belonging to the 
              ‘Christian Religion.’
            </p>
          </div>
    
          {/* Programs Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-semibold  mb-6 heading-premium">Programs and Intake Capacity</h2>
          </div>
    
          {/* Undergraduate Programs */}
          <div className="mb-8">
            <h3 className="text-xl font-medium text-gray-800 mb-4">
              Undergraduate Programs (B.Tech):
            </h3>
            <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
              <li>Computer Engineering: 120</li>
              <li>Mechanical Engineering: 120</li>
              <li>Electronics and Telecommunication Engineering: 60</li>
              <li>Electrical Engineering: 60</li>
              <li>Information Technology: 60</li>
            </ul>
          </div>
    
          {/* Post Graduate Programs */}
          <div className="mb-8">
            <h3 className="text-xl font-medium text-gray-800 mb-4">
              Post Graduate Programs: Masters in Technology (M.Tech)
            </h3>
            <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
              <li>Mechanical Engineering: 18</li>
              <li>Electrical Engineering: 09</li>
            </ul>
          </div>
    
          {/* PhD Programs */}
          <div>
            <h3 className="text-xl font-medium text-gray-800 mb-4">PhD Programs:</h3>
            <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
              <li>Mechanical Engineering: 25</li>
              <li>Electrical Engineering: 20</li>
              <li>Electronics and Telecommunication Engineering: 10</li>
            </ul>
          </div>
        </div>
      );
    };
    

// Undergraduate Admissions Component
export const UnderG = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extralight text-black mb-3 heading-premium">Undergraduate Admissions</h1>
      </div>

      {/* First Year Admissions */}
      <div className="mb-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">First Year Admissions:</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          80% seats of the sanctioned intake are admitted through the centralized process, while the remaining 20% are admitted at the Institute level.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          51% of the centralized admission seats are under Minority Quota.
        </p>
      </div>

      {/* Centralized Admission Process */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Centralized Admission Process</h3>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          <strong>Eligibility:</strong> As per the Directives of the DTE/ Competent Authority/ Regulatory Authority.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          The aspiring candidates must apply online through the CET Cell. Rules and Schedules for the Admission Rounds would be as per the Directives of DTE/ Competent Authority/ Regulatory Authority.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          <a href="https://link-to-centralized-admission" className="text-blue-600 hover:underline">Click Here</a> for the detailed Centralized Admission Procedure for the Year 2020.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          After the allotment of the seat by DTE, the candidates must report to the ARC and the respective institute for confirmation of the admission.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Information and List of Documents for Centralized Process.
        </p>

        {/* Button for Centralized Info */}
        <div className="mt-8 flex justify-center">
          <a 
            href="https://link-to-centralized-docs" 
                            className="btn-primary py-2 px-6 rounded-full text-xl font-medium shadow-lg"
          >
            Centralized
          </a>
        </div>
      </div>

      {/* Institute Level Admission */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Institute Level Admission:</h3>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          <strong>Eligibility:</strong> Same as the Centralized Admission.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          The candidates must possess a valid CAP Merit number. The aspiring candidates must separately apply to the Institute for admission under this quota.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          The institute brochures containing the admission form can be bought by the candidate from the institute.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          A separate merit list of the candidates who have applied through the Institute Quota would be prepared based on the CAP merit numbers of the candidates. This merit list would be displayed on our institute website.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Candidates must keep checking the institute website for details regularly. Admission to the eligible candidates would be done strictly as per the merit only, after verification of the documents.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Information and List of Documents for Institute Process.
        </p>

        {/* Button for Institute Info */}
        <div className="mt-8 flex justify-center">
          <a 
            href="https://link-to-institute-docs" 
                            className="btn-primary py-2 px-6 rounded-full text-xl font-medium shadow-lg"
          >
            Institute
          </a>
        </div>
      </div>

      {/* Direct Second Year Admissions */}
      <div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Direct Second Year Admissions</h3>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Students seeking admission to the second year of the undergraduate programs through the Institute must fulfill the eligibility criteria as per DTE norms.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          A separate merit list is prepared, and the candidates must follow the guidelines issued by DTE.
        </p>
      </div>
       {/* Button for Institute Info */}
       <div className="mt-8 flex justify-center">
          <a 
            href="https://link-to-institute-docs" 
                            className="btn-primary py-2 px-6 rounded-full text-xl font-medium shadow-lg"
          >
            DSE Centralized
          </a>
        </div>
      </div>
    
  );
};





export const PostG = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extralight text-black mb-3 heading-premium">Post Graduate Admissions</h1>
      </div>

      {/* Masters of Technology (M.Tech) */}
      <div className="mb-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Masters of Technology (M.Tech):</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Allotment of Seats for the Masters Program would be done through the centralized process.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          51% of the centralized admission seats are under Minority Quota.
        </p>
      </div>

      {/* Eligibility & Admission Process */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Eligibility & Admission Process</h3>
        
        <ul className="list-disc list-inside text-lg text-gray-700 mb-6">
          <li>Eligibility: As per the Directives of the DTE/ Competent Authority/ Regulatory Authority.</li>
          <li>Rules and Schedules for the Admission Rounds would be as per the Directives of DTE/ Competent Authority/ Regulatory Authority.</li>
          <li>The distribution of seats for Admissions and the Admission process under Minority Seats (Institute level seats / CAP Seats) is as notified by DTE / ARA / Govt. Of Maharashtra.</li>
          <li>Candidates with a valid Gate Score would be eligible for Stipend as per the norms of the Regulatory Authority.</li>
        </ul>
      </div>

      {/* Button for Centralized */}
      <div className="mt-8 flex justify-center">
        <a 
          href="https://link-to-centralized-admission" 
                          className="btn-primary py-2 px-6 rounded-full text-xl font-medium shadow-lg"
        >
          Centralized
        </a>
      </div>
    </div>
  );
};



export const PhD = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extralight text-black mb-3 heading-premium">PhD Admissions</h1>
      </div>

      {/* PhD Admission Details */}
      <div className="mb-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">PhD Admissions</h2>
        
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          <strong>Application Form for PhD:</strong> Please check the institute website or advertisements in the newspapers for the application form.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          <strong>List of Required Documents:</strong> 
        </p>
        <ul className="list-disc list-inside text-lg text-gray-700 mb-6">
          <li>Completed Application Form</li>
          <li>Photocopy of Bachelor’s Degree</li>
          <li>Valid GATE/PET Scorecard</li>
          <li>Proof of Identity</li>
          <li>Passport-size Photograph</li>
        </ul>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          <strong>Eligibility:</strong>
        </p>
        <ul className="list-disc list-inside text-lg text-gray-700 mb-6">
          <li>Candidate must be an Indian National possessing a Bachelor’s Degree in the respective/related fields of Engineering.</li>
          <li>Candidates must possess a valid GATE/PET Score.</li>
          <li>Applications are invited by advertisement in the newspapers and the institute website.</li>
          <li>After scrutinizing the applications, call letters are sent to the candidates.</li>
          <li>The candidates are selected based on the inter-se merit of the PET Score and the Technical Interview.</li>
        </ul>
      </div>

      {/* Button for Centralized */}
      <div className="mt-8 flex justify-center">
        <a 
          href="https://link-to-phd-admission" 
                          className="btn-primary py-2 px-6 rounded-full text-xl font-medium shadow-lg"
        >
          Proposed Fee
        </a>
      </div>
    </div>
  );
};


export const Fees = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen flex flex-col items-center justify-center font-sans">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extralight text-gray-900 mb-6 heading-premium">Fee Payment</h1>
        <p className="text-xl text-gray-700 mb-6">Please proceed with the fee payment by clicking the button below:</p>
      </div>

      {/* Fee Payment Button */}
      <div className="flex justify-center items-center">
        <a 
          href="https://www.eduqfix.com/PayDirect/#/student/pay/XxoRsO6mfiXGAnQY1R64lGgQcWtw4tYKPWYLPO8nzoGBvtL6DIe+F9YjQMK1keFr/254" 
          className="btn-primary py-4 px-8 rounded-xl text-2xl font-semibold shadow-lg"
        >
          Pay Fees
        </a>
      </div>
    </div>
  );
};


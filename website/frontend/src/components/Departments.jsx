


import React from 'react';
import Footer from './Footer';

const Departments = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            
            <div className="bg-[#dde5ef] text-black py-8">
                <h1 className="text-3xl font-extrabold text-left pl-7 uppercase">
                    DEPARTMENTS
                </h1>
                <p className="text-sm text-left pl-7 mt-2">Home / Departments</p>
            </div>

            {/* Departments Section */}
            <main className="flex flex-col items-center py-8">
                <div className="flex w-11/12 max-w-7xl">
                    {/* Sidebar */}
                    <div className="w-1/4 pr-6">
                        <ul className="space-y-3">
                            {[
                                "Home",
                                "Computer Engineering",
                                "Mechanical Engineering",
                                "Electronics and Telecommunication Engineering",
                                "Electrical Engineering",
                                "Information Technology",
                                "Basic Science and Humanities",
                            ].map((department, index) => (
                                <li
                                    key={index}
                                    className="relative group cursor-pointer"
                                >
                                    <a
                                        href="#"
                                        className="block px-2 py-2 text-gray-700 font-semibold transition duration-300 ease-in-out group-hover:text-[#0c2340] group-hover:bg-gray-50"
                                    >
                                        {department}
                                    </a>
                                    <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Divider */}
                    <div className="w-[1px] bg-gray-300"></div>

                    {/* Content Area */}
                    <div className="w-3/4 pl-6">
                        <h2 className="text-2xl font-bold mb-4 text-[#0c2340]">
                            Welcome to Our Departments
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                        Lorem ipsum odor amet, consectetuer adipiscing elit. Litora hendrerit et est nullam sem tellus natoque. Fringilla nascetur litora faucibus vitae habitasse feugiat ridiculus. Suspendisse vulputate sodales malesuada lacus blandit pretium aliquam. Aliquet taciti tempus sociosqu phasellus ante, platea lectus. Eleifend nisl cursus tempor lacus cubilia sit lacinia.
                        Lorem ipsum odor amet, consectetuer adipiscing elit. Litora hendrerit et est nullam sem tellus natoque. Fringilla nascetur litora faucibus vitae habitasse feugiat ridiculus. Suspendisse vulputate sodales malesuada lacus blandit pretium aliquam. Aliquet taciti tempus sociosqu phasellus ante, platea lectus. Eleifend nisl cursus tempor lacus cubilia sit lacinia.
                        Lorem ipsum odor amet, consectetuer adipiscing elit. Litora hendrerit et est nullam sem tellus natoque. Fringilla nascetur litora faucibus vitae habitasse feugiat ridiculus. Suspendisse vulputate sodales malesuada lacus blandit pretium aliquam. Aliquet taciti tempus sociosqu phasellus ante, platea lectus. Eleifend nisl cursus tempor lacus cubilia sit lacinia.
                        Lorem ipsum odor amet, consectetuer adipiscing elit. Litora hendrerit et est nullam sem tellus natoque. Fringilla nascetur litora faucibus vitae habitasse feugiat ridiculus. Suspendisse vulputate sodales malesuada lacus blandit pretium aliquam. Aliquet taciti tempus sociosqu phasellus ante, platea lectus. Eleifend nisl cursus tempor lacus cubilia sit lacinia.
                        Lorem ipsum odor amet, consectetuer adipiscing elit. Litora hendrerit et est nullam sem tellus natoque. Fringilla nascetur litora faucibus vitae habitasse feugiat ridiculus. Suspendisse vulputate sodales malesuada lacus blandit pretium aliquam. Aliquet taciti tempus sociosqu phasellus ante, platea lectus. Eleifend nisl cursus tempor lacus cubilia sit lacinia.
                        Lorem ipsum odor amet, consectetuer adipiscing elit. Litora hendrerit et est nullam sem tellus natoque. Fringilla nascetur litora faucibus vitae habitasse feugiat ridiculus. Suspendisse vulputate sodales malesuada lacus blandit pretium aliquam. Aliquet taciti tempus sociosqu phasellus ante, platea lectus. Eleifend nisl cursus tempor lacus cubilia sit lacinia.
                        Lorem ipsum odor amet, consectetuer adipiscing elit. Litora hendrerit et est nullam sem tellus natoque. Fringilla nascetur litora faucibus vitae habitasse feugiat ridiculus. Suspendisse vulputate sodales malesuada lacus blandit pretium aliquam. Aliquet taciti tempus sociosqu phasellus ante, platea lectus. Eleifend nisl cursus tempor lacus cubilia sit lacinia.
                        Lorem ipsum odor amet, consectetuer adipiscing elit. Litora hendrerit et est nullam sem tellus natoque. Fringilla nascetur litora faucibus vitae habitasse feugiat ridiculus. Suspendisse vulputate sodales malesuada lacus blandit pretium aliquam. Aliquet taciti tempus sociosqu phasellus ante, platea lectus. Eleifend nisl cursus tempor lacus cubilia sit lacinia.
                        Lorem ipsum odor amet, consectetuer adipiscing elit. Litora hendrerit et est nullam sem tellus natoque. Fringilla nascetur litora faucibus vitae habitasse feugiat ridiculus. Suspendisse vulputate sodales malesuada lacus blandit pretium aliquam. Aliquet taciti tempus sociosqu phasellus ante, platea lectus. Eleifend nisl cursus tempor lacus cubilia sit lacinia.
                        Lorem ipsum odor amet, consectetuer adipiscing elit. Litora hendrerit et est nullam sem tellus natoque. Fringilla nascetur litora faucibus vitae habitasse feugiat ridiculus. Suspendisse vulputate sodales malesuada lacus blandit pretium aliquam. Aliquet taciti tempus sociosqu phasellus ante, platea lectus. Eleifend nisl cursus tempor lacus cubilia sit lacinia.
                        Lorem ipsum odor amet, consectetuer adipiscing elit. Litora hendrerit et est nullam sem tellus natoque. Fringilla nascetur litora faucibus vitae habitasse feugiat ridiculus. Suspendisse vulputate sodales malesuada lacus blandit pretium aliquam. Aliquet taciti tempus sociosqu phasellus ante, platea lectus. Eleifend nisl cursus tempor lacus cubilia sit lacinia.
                        Lorem ipsum odor amet, consectetuer adipiscing elit. Litora hendrerit et est nullam sem tellus natoque. Fringilla nascetur litora faucibus vitae habitasse feugiat ridiculus. Suspendisse vulputate sodales malesuada lacus blandit pretium aliquam. Aliquet taciti tempus sociosqu phasellus ante, platea lectus. Eleifend nisl cursus tempor lacus cubilia sit lacinia.
                        Lorem ipsum odor amet, consectetuer adipiscing elit. Litora hendrerit et est nullam sem tellus natoque. Fringilla nascetur litora faucibus vitae habitasse feugiat ridiculus. Suspendisse vulputate sodales malesuada lacus blandit pretium aliquam. Aliquet taciti tempus sociosqu phasellus ante, platea lectus. Eleifend nisl cursus tempor lacus cubilia sit lacinia.
                        Lorem ipsum odor amet, consectetuer adipiscing elit. Litora hendrerit et est nullam sem tellus natoque. Fringilla nascetur litora faucibus vitae habitasse feugiat ridiculus. Suspendisse vulputate sodales malesuada lacus blandit pretium aliquam. Aliquet taciti tempus sociosqu phasellus ante, platea lectus. Eleifend nisl cursus tempor lacus cubilia sit lacinia.
                        Lorem ipsum odor amet, consectetuer adipiscing elit. Litora hendrerit et est nullam sem tellus natoque. Fringilla nascetur litora faucibus vitae habitasse feugiat ridiculus. Suspendisse vulputate sodales malesuada lacus blandit pretium aliquam. Aliquet taciti tempus sociosqu phasellus ante, platea lectus. Eleifend nisl cursus tempor lacus cubilia sit lacinia.
                        Lorem ipsum odor amet, consectetuer adipiscing elit. Litora hendrerit et est nullam sem tellus natoque. Fringilla nascetur litora faucibus vitae habitasse feugiat ridiculus. Suspendisse vulputate sodales malesuada lacus blandit pretium aliquam. Aliquet taciti tempus sociosqu phasellus ante, platea lectus. Eleifend nisl cursus tempor lacus cubilia sit lacinia.
                        Lorem ipsum odor amet, consectetuer adipiscing elit. Litora hendrerit et est nullam sem tellus natoque. Fringilla nascetur litora faucibus vitae habitasse feugiat ridiculus. Suspendisse vulputate sodales malesuada lacus blandit pretium aliquam. Aliquet taciti tempus sociosqu phasellus ante, platea lectus. Eleifend nisl cursus tempor lacus cubilia sit lacinia.
                        Lorem ipsum odor amet, consectetuer adipiscing elit. Litora hendrerit et est nullam sem tellus natoque. Fringilla nascetur litora faucibus vitae habitasse feugiat ridiculus. Suspendisse vulputate sodales malesuada lacus blandit pretium aliquam. Aliquet taciti tempus sociosqu phasellus ante, platea lectus. Eleifend nisl cursus tempor lacus cubilia sit lacinia.
                            Lorem ipsum odor amet, consectetuer adipiscing elit. Litora hendrerit et est nullam sem tellus natoque. Fringilla nascetur litora faucibus vitae habitasse feugiat ridiculus. Suspendisse vulputate sodales malesuada lacus blandit pretium aliquam. Aliquet taciti tempus sociosqu phasellus ante, platea lectus. Eleifend nisl cursus tempor lacus cubilia sit lacinia.
                        </p>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            Aliquet taciti tempus sociosqu phasellus ante, platea lectus. Eleifend nisl cursus tempor lacus cubilia sit lacinia.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Praesent ligula quam vestibulum felis aptent, enim montes. Fames urna tortor consequat sociosqu enim.
                        </p>
                    </div>
                </div>
            </main>

            
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default Departments;





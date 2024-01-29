'use client';

import Image from 'next/image';
import { useState } from 'react';
import cosplayerIcon from '@apple-logo.png';
import photographerIcon from '@/public/icons/photographer.png';

export default function Guidelines() {
  const [showSelection, setShowSelection] = useState(true);
  const [userSelection, setUserSelection] = useState('');
  return (
    <div className="h-full w-full">
      <div className={`${showSelection ? 'visable' : 'invisible'}`}>
        <div
          className={`${showSelection ? 'backdrop-brightness-50' : 'backdrop-brightness-100'} fixed h-full w-full transition-all duration-300`}
        ></div>

        <div
          className={`${showSelection ? 'block' : 'hidden'} fixed left-[50%] top-[50%] flex h-[90%] w-[85%] translate-x-[-50%] translate-y-[-50%] flex-col items-center rounded-3xl bg-white p-4`}
        >
          <h1 className="mb-5 text-4xl font-bold">Are you a...</h1>

          <hr className="mb-5 h-[2px] w-[90%] rounded-lg bg-black"></hr>

          <div className="mb-2 flex w-full flex-grow flex-col justify-between">
            <button
              onClick={() => {
                setUserSelection('Cosplayer');
                setShowSelection(false);
              }}
              className="group flex h-[30%] w-full items-center justify-center rounded-xl border-2 border-red-400 text-2xl font-bold"
            >
              <Image
                alt="Cosplayer Icon"
                src={cosplayerIcon}
                width={40}
                height={40}
                className="duration-400 opacity-0 transition-all group-hover:opacity-100"
              />

              <span className="duration-400 mx-8 transition-transform group-hover:scale-125">
                Cosplayer
              </span>

              <Image
                alt="Cosplayer Icon"
                src={cosplayerIcon}
                width={40}
                height={40}
                className="duration-400 opacity-0 transition-all group-hover:opacity-100"
              />
            </button>

            <button
              onClick={() => {
                setUserSelection('Photographer');
                setShowSelection(false);
              }}
              className="group flex h-[30%] w-full items-center justify-center rounded-xl border-2 border-blue-400 text-2xl font-bold"
            >
              <Image
                alt="Photographer Icon"
                src={photographerIcon}
                width={40}
                height={40}
                className="duration-400 opacity-0 transition-all group-hover:opacity-100"
              />

              <span className="duration-400 mx-8 transition-transform group-hover:scale-125">
                Photographer
              </span>

              <Image
                alt="photographer Icon"
                src={photographerIcon}
                width={40}
                height={40}
                className="duration-400 opacity-0 transition-all group-hover:opacity-100"
              />
            </button>

            <button
              onClick={() => {
                setUserSelection('Both');
                setShowSelection(false);
              }}
              className="group flex h-[30%] w-full items-center justify-center rounded-xl border-2 border-violet-400 text-2xl font-bold"
            >
              <Image
                alt="Photographer Icon"
                src={cosplayerIcon}
                width={40}
                height={40}
                className="duration-400 opacity-0 transition-all group-hover:opacity-100"
              />

              <span className="duration-400 mx-8 transition-transform group-hover:scale-125">
                Both
              </span>

              <Image
                alt="Cosplayer Icon"
                src={photographerIcon}
                width={40}
                height={40}
                className="duration-400 opacity-0 transition-all group-hover:opacity-100"
              />
            </button>
          </div>
        </div>
      </div>

      {userSelection === 'Cosplayer' && (
        <div className="mb-8 flex flex-col items-center px-5">
          <h1 className="my-8 text-4xl font-bold">Cosplayer Guidelines</h1>

          <hr className="mb-8 h-[2px] w-[90%] rounded-lg bg-black"></hr>

          <ul className="list-decimal pl-8 lg:text-lg">
            <li className="mb-3">
              Communication and Boundaries:
              <ul className="list-disc pl-5">
                <li>
                  Clearly communicate comfort levels, boundaries, and
                  expectations.
                </li>
                <li>
                  Provide specific instructions related to costumes or props.
                </li>
              </ul>
            </li>

            <li className="mb-3">
              Professionalism:
              <ul className="list-disc pl-5">
                <li>Arrive on time and conduct yourself professionally.</li>
                <li>Respect the photographer's time and effort.</li>
              </ul>
            </li>

            <li className="mb-3">
              Collaboration:
              <ul className="list-disc pl-5">
                <li>Share ideas and collaborate on the creative process.</li>
                <li>Be open to suggestions from the photographer.</li>
              </ul>
            </li>

            <li className="mb-3">
              Costume Maintenance:
              <ul className="list-disc pl-5">
                <li>Ensure costumes are in good condition.</li>
                <li>Bring tools for quick fixes during the shoot.</li>
              </ul>
            </li>

            <li className="mb-3">
              Respect for Photographers' Equipment:
              <ul className="list-disc pl-5">
                <li>Handle equipment with care and seek permission.</li>
                <li>
                  Avoid touching or adjusting the photographer's gear without
                  consent.
                </li>
              </ul>
            </li>

            <li className="mb-3">
              Safety Awareness:
              <ul className="list-disc pl-5">
                <li>Be mindful of safety during action shots.</li>
                <li>Report safety concerns to the photographer.</li>
              </ul>
            </li>

            <li className="mb-3">
              Consent for Image Usage:
              <ul className="list-disc pl-5">
                <li>Discuss and agree on photo usage before the shoot.</li>
                <li>Communicate any restrictions on photo editing.</li>
              </ul>
            </li>

            <li className="mb-3">
              Communication on Set:
              <ul className="list-disc pl-5">
                <li>Maintain clear communication during the shoot.</li>
                <li>Be receptive to feedback from the photographer.</li>
              </ul>
            </li>

            <li className="mb-3">
              Respect for Public Spaces:
              <ul className="list-disc pl-5">
                <li>Follow rules in public spaces.</li>
                <li>Obtain permissions for locations.</li>
              </ul>
            </li>

            <li>
              Professional Conduct Online:
              <ul className="list-disc pl-5">
                <li>Represent yourself professionally online.</li>
                <li>Credit the photographer in social media posts.</li>
              </ul>
            </li>
          </ul>
        </div>
      )}

      {userSelection === 'Photographer' && (
        <div className="mb-8 flex flex-col items-center px-5">
          <h1 className="my-8 text-center text-4xl font-bold">
            Photographer Guidelines
          </h1>
          <hr className="mb-8 h-[2px] w-[90%] rounded-lg bg-black"></hr>

          <ul className="list-decimal pl-8 lg:text-lg">
            <li className="mb-3">
              Communication and Consent:
              <ul className="list-disc pl-5">
                <li>Clearly communicate the shoot's scope and expectations.</li>
                <li>Obtain explicit consent for changes during the shoot.</li>
              </ul>
            </li>

            <li className="mb-3">
              Respect Personal Space:
              <ul className="list-disc pl-5">
                <li>Respect cosplayers' personal space.</li>
                <li>Avoid unnecessary physical contact without permission.</li>
              </ul>
            </li>

            <li className="mb-3">
              Professionalism:
              <ul className="list-disc pl-5">
                <li>Be punctual and prepared.</li>
                <li>Communicate professionally with cosplayers.</li>
              </ul>
            </li>

            <li className="mb-3">
              Collaboration:
              <ul className="list-disc pl-5">
                <li>Encourage cosplayers to share ideas.</li>
                <li>Respect cosplayers' creative input.</li>
              </ul>
            </li>

            <li className="mb-3">
              Usage of Photos:
              <ul className="list-disc pl-5">
                <li>Discuss photo usage and editing restrictions.</li>
                <li>Credit cosplayers when sharing photos.</li>
              </ul>
            </li>

            <li className="mb-3">
              Credit and Recognition:
              <ul className="list-disc pl-5">
                <li>Give proper credit to cosplayers.</li>
                <li>Agree on attribution preferences.</li>
              </ul>
            </li>

            <li className="mb-3">
              Safety First:
              <ul className="list-disc pl-5">
                <li>Prioritize safety during the shoot.</li>
                <li>Address safety concerns promptly.</li>
              </ul>
            </li>

            <li className="mb-3">
              Consent for Public Spaces:
              <ul className="list-disc pl-5">
                <li>Follow rules in public spaces.</li>
                <li>Inform cosplayers about location challenges.</li>
              </ul>
            </li>

            <li className="mb-3">
              Cancellation and Rescheduling:
              <ul className="list-disc pl-5">
                <li>Establish clear policies.</li>
                <li>Communicate changes well in advance.</li>
              </ul>
            </li>

            <li className="mb-3">
              Feedback and Continuous Improvement:
              <ul className="list-disc pl-5">
                <li>Provide constructive feedback.</li>
                <li>Maintain open communication for improvement.</li>
              </ul>
            </li>
          </ul>
        </div>
      )}

      {userSelection === 'Both' && (
        <div className="mb-8 flex flex-col items-center px-5">
          <h1 className="my-8 text-center text-4xl font-bold">
            Cosplayer & Photographer Guidelines
          </h1>
          <hr className="mb-8 h-[2px] w-[90%] rounded-lg bg-black"></hr>

          <ul className="list-decimal pl-8 lg:text-lg">
            <li className="mb-3">
              Clearly communicate expectations and obtain consent.
              <ul className="list-disc pl-5">
                <li>
                  Prioritize open communication for a positive experience.
                </li>
              </ul>
            </li>

            <li className="mb-3">
              Respect for Personal Space:
              <ul className="list-disc pl-5">
                <li>Respect each other's personal space and boundaries.</li>
              </ul>
            </li>

            <li className="mb-3">
              Professionalism:
              <ul className="list-disc pl-5">
                <li>Arrive on time and conduct yourselves professionally.</li>
              </ul>
            </li>

            <li className="mb-3">
              Collaboration:
              <ul className="list-disc pl-5">
                <li>
                  Collaborate on the creative process and respect contributions.
                </li>
              </ul>
            </li>

            <li className="mb-3">
              Usage of Photos:
              <ul className="list-disc pl-5">
                <li>Discuss and agree on photo usage and credits.</li>
              </ul>
            </li>

            <li className="mb-3">
              Credit and Recognition:
              <ul className="list-disc pl-5">
                <li>Give proper credit when sharing photos.</li>
              </ul>
            </li>

            <li className="mb-3">
              Safety First:
              <ul className="list-disc pl-5">
                <li>Prioritize safety during the shoot.</li>
              </ul>
            </li>

            <li className="mb-3">
              Consent for Public Spaces:
              <ul className="list-disc pl-5">
                <li>Follow rules and obtain permissions in public spaces.</li>
              </ul>
            </li>

            <li className="mb-3">
              Cancellation and Rescheduling:
              <ul className="list-disc pl-5">
                <li>Establish clear policies and communicate changes.</li>
              </ul>
            </li>

            <li className="mb-3">
              Feedback and Continuous Improvement:
              <ul className="list-disc pl-5">
                <li>Provide constructive feedback for mutual improvement.</li>
              </ul>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

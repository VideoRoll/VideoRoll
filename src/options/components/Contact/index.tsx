import { defineComponent } from "vue";
import { createURL } from 'src/util';
import browser from 'webextension-polyfill'
import './index.less';

export default defineComponent({
    name: "Contact",
    setup(props) {
        const toDiscord = () => {
            createURL('https://discord.gg/rbMDhKpyeB');
        }

        const toGithub = () => {
            createURL('https://github.com/gxy5202/VideoRoll');
        };

        const toChrome = () => {
            createURL('https://chromewebstore.google.com/detail/video-roll/cokngoholafkeghnhhdlmiadlojpindm');
        }

        const toEdge = () => {
            createURL('https://microsoftedge.microsoft.com/addons/detail/video-roll/indeeigndpaahbcegcanpmbenmkbkmmn');
        }

        const toFirfox = () => {
            createURL('https://addons.mozilla.org/en-US/firefox/addon/videoroll/');
        }

        const wechat = new URL(
            'images/qun.jpg',
            import.meta.url
        ).toString();

        return () => (
            <div class="options-general">
                <div class="options-content-h">
                    <div class="options-contact" onClick={toDiscord}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0,0,256,256" width="50px" height="50px"><g fill-opacity="0.96078" fill="#f6f6f6" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.12,5.12)"><path d="M41.625,10.76953c-3.98047,-3.20313 -10.27734,-3.74609 -10.54687,-3.76563c-0.41797,-0.03516 -0.81641,0.19922 -0.98828,0.58594c-0.01562,0.02344 -0.15234,0.33984 -0.30469,0.83203c2.63281,0.44531 5.86719,1.33984 8.79297,3.15625c0.46875,0.28906 0.61328,0.90625 0.32422,1.375c-0.19141,0.30859 -0.51562,0.47656 -0.85156,0.47656c-0.17969,0 -0.36328,-0.05078 -0.52734,-0.15234c-5.03125,-3.12109 -11.3125,-3.27734 -12.52344,-3.27734c-1.21094,0 -7.49609,0.15625 -12.52344,3.27734c-0.46875,0.29297 -1.08594,0.14844 -1.375,-0.32031c-0.29297,-0.47266 -0.14844,-1.08594 0.32031,-1.37891c2.92578,-1.8125 6.16016,-2.71094 8.79297,-3.15234c-0.15234,-0.49609 -0.28906,-0.80859 -0.30078,-0.83594c-0.17578,-0.38672 -0.57031,-0.62891 -0.99219,-0.58594c-0.26953,0.01953 -6.56641,0.5625 -10.60156,3.80859c-2.10547,1.94922 -6.32031,13.33984 -6.32031,23.1875c0,0.17578 0.04688,0.34375 0.13281,0.49609c2.90625,5.10938 10.83984,6.44531 12.64844,6.50391c0.00781,0 0.01953,0 0.03125,0c0.32031,0 0.62109,-0.15234 0.80859,-0.41016l1.82813,-2.51562c-4.93359,-1.27344 -7.45312,-3.4375 -7.59766,-3.56641c-0.41406,-0.36328 -0.45312,-0.99609 -0.08594,-1.41016c0.36328,-0.41406 0.99609,-0.45312 1.41016,-0.08984c0.05859,0.05469 4.69922,3.99219 13.82422,3.99219c9.14063,0 13.78125,-3.95312 13.82813,-3.99219c0.41406,-0.35937 1.04297,-0.32422 1.41016,0.09375c0.36328,0.41406 0.32422,1.04297 -0.08984,1.40625c-0.14453,0.12891 -2.66406,2.29297 -7.59766,3.56641l1.82813,2.51563c0.1875,0.25781 0.48828,0.41016 0.80859,0.41016c0.01172,0 0.02344,0 0.03125,0c1.80859,-0.05859 9.74219,-1.39453 12.64844,-6.50391c0.08594,-0.15234 0.13281,-0.32031 0.13281,-0.49609c0,-9.84766 -4.21484,-21.23828 -6.375,-23.23047zM18.5,30c-1.93359,0 -3.5,-1.78906 -3.5,-4c0,-2.21094 1.56641,-4 3.5,-4c1.93359,0 3.5,1.78906 3.5,4c0,2.21094 -1.56641,4 -3.5,4zM31.5,30c-1.93359,0 -3.5,-1.78906 -3.5,-4c0,-2.21094 1.56641,-4 3.5,-4c1.93359,0 3.5,1.78906 3.5,4c0,2.21094 -1.56641,4 -3.5,4z"></path></g></g></svg>
                        <p>Discord</p>
                    </div>
                    <div class="options-contact" onClick={toGithub}>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0,0,256,256"
                            style="fill:#000000;">
                            <g fill-opacity="0.96078" fill="#f6f6f6" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(8.53333,8.53333)"><path d="M15,3c-6.627,0 -12,5.373 -12,12c0,5.623 3.872,10.328 9.092,11.63c-0.056,-0.162 -0.092,-0.35 -0.092,-0.583v-2.051c-0.487,0 -1.303,0 -1.508,0c-0.821,0 -1.551,-0.353 -1.905,-1.009c-0.393,-0.729 -0.461,-1.844 -1.435,-2.526c-0.289,-0.227 -0.069,-0.486 0.264,-0.451c0.615,0.174 1.125,0.596 1.605,1.222c0.478,0.627 0.703,0.769 1.596,0.769c0.433,0 1.081,-0.025 1.691,-0.121c0.328,-0.833 0.895,-1.6 1.588,-1.962c-3.996,-0.411 -5.903,-2.399 -5.903,-5.098c0,-1.162 0.495,-2.286 1.336,-3.233c-0.276,-0.94 -0.623,-2.857 0.106,-3.587c1.798,0 2.885,1.166 3.146,1.481c0.896,-0.307 1.88,-0.481 2.914,-0.481c1.036,0 2.024,0.174 2.922,0.483c0.258,-0.313 1.346,-1.483 3.148,-1.483c0.732,0.731 0.381,2.656 0.102,3.594c0.836,0.945 1.328,2.066 1.328,3.226c0,2.697 -1.904,4.684 -5.894,5.097c1.098,0.573 1.899,2.183 1.899,3.396v2.734c0,0.104 -0.023,0.179 -0.035,0.268c4.676,-1.639 8.035,-6.079 8.035,-11.315c0,-6.627 -5.373,-12 -12,-12z"></path></g></g>
                        </svg>
                        <p>Github</p>
                    </div>
                    <div class="options-contact" onClick={toChrome}>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48">
                            <path fill="#4caf50" d="M44,24c0,11.044-8.956,20-20,20S4,35.044,4,24S12.956,4,24,4S44,12.956,44,24z"></path><path fill="#ffc107" d="M24,4v20l8,4l-8.843,16c0.317,0,0.526,0,0.843,0c11.053,0,20-8.947,20-20S35.053,4,24,4z"></path><path fill="#4caf50" d="M44,24c0,11.044-8.956,20-20,20S4,35.044,4,24S12.956,4,24,4S44,12.956,44,24z"></path><path fill="#ffc107" d="M24,4v20l8,4l-8.843,16c0.317,0,0.526,0,0.843,0c11.053,0,20-8.947,20-20S35.053,4,24,4z"></path><path fill="#f44336" d="M41.84,15H24v13l-3-1L7.16,13.26H7.14C10.68,7.69,16.91,4,24,4C31.8,4,38.55,8.48,41.84,15z"></path><path fill="#dd2c00" d="M7.158,13.264l8.843,14.862L21,27L7.158,13.264z"></path><path fill="#558b2f" d="M23.157,44l8.934-16.059L28,25L23.157,44z"></path><path fill="#f9a825" d="M41.865,15H24l-1.579,4.58L41.865,15z"></path><path fill="#fff" d="M33,24c0,4.969-4.031,9-9,9s-9-4.031-9-9s4.031-9,9-9S33,19.031,33,24z"></path><path fill="#2196f3" d="M31,24c0,3.867-3.133,7-7,7s-7-3.133-7-7s3.133-7,7-7S31,20.133,31,24z"></path>
                        </svg>
                        <p>Chrome</p>
                    </div>
                    <div class="options-contact" onClick={toEdge}>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48">
                            <path fill="#1de9b6" d="M4,23.481C4,15.673,10.557,4,24.014,4C37.452,4,44,13.923,44,20.905c0,5.604-4.429,9.732-9.992,9.732	c-4.245,0-6.759-1.408-6.759-2.53c0-0.726,1.755-1.837,1.755-3.982c0-2.565-1.986-5.137-5.045-5.137	c-2.934,0-4.974,2.442-4.974,4.905c0,5.952,5.63,11.644,13.931,11.644c4.959,0,6.759-1.828,7.403-1.828	c0.196,0,0.647,0.08,0.647,0.603c0,0.5-5.486,9.686-16.94,9.686C12.632,44,4,35.023,4,23.481z"></path><radialGradient id="2pm2zgLwrfHW4PMfqfOjYa_dGm9KIZPpukc_gr1" cx="17.993" cy="32.825" r="21.348" gradientTransform="matrix(1 0 0 1.1083 0 -3.529)" gradientUnits="userSpaceOnUse"><stop offset=".652" stop-color="#0083de"></stop><stop offset=".822" stop-color="#006aac"></stop><stop offset=".944" stop-color="#005a8c"></stop></radialGradient><path fill="url(#2pm2zgLwrfHW4PMfqfOjYa_dGm9KIZPpukc_gr1)" d="M4,23.481c0-7.808,7.615-12.04,12.73-12.04c13.439,0,17.277,2.483,17.277,9.465	c0,5.604-5.003,5.366-5.003,3.221c0-2.565-1.986-5.137-5.045-5.137c-2.934,0-4.974,2.442-4.974,4.905	c0,5.952,5.63,11.644,13.931,11.644c4.959,0,6.759-1.828,7.403-1.828c0.196,0,0.647,0.08,0.647,0.603c0,0.5-5.486,9.686-16.94,9.686	C12.632,44,4,35.023,4,23.481z"></path><radialGradient id="2pm2zgLwrfHW4PMfqfOjYb_dGm9KIZPpukc_gr2" cx="28.082" cy="29.295" r="16.478" gradientTransform="matrix(1 0 0 1.0028 0 -.067)" gradientUnits="userSpaceOnUse"><stop offset=".69" stop-color="#05509b"></stop><stop offset=".717" stop-color="#054e98"></stop><stop offset="1" stop-color="#033e78"></stop></radialGradient><path fill="url(#2pm2zgLwrfHW4PMfqfOjYb_dGm9KIZPpukc_gr2)" d="M18.985,23.894c0-2.298,1.775-4.575,4.395-4.871c-4.104,0.349-8.798,4.375-8.798,11.831	c0,7.963,6.864,13.465,13.943,12.628c8.386-1.927,12.441-8.74,12.441-9.168c0-0.523-0.451-0.603-0.647-0.603	c-0.643,0-2.444,1.828-7.403,1.828C24.615,35.539,18.985,29.847,18.985,23.894z"></path><radialGradient id="2pm2zgLwrfHW4PMfqfOjYc_dGm9KIZPpukc_gr3" cx="47.648" cy="16.079" r="61.532" gradientTransform="matrix(-1 0 0 -1.5084 95.296 40.31)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#5eeb69"></stop><stop offset=".214" stop-color="#4bc958"></stop><stop offset=".225" stop-color="#4ac862"></stop><stop offset=".272" stop-color="#47c68b"></stop><stop offset=".323" stop-color="#44c4ae"></stop><stop offset=".376" stop-color="#41c2cb"></stop><stop offset=".433" stop-color="#3fc1e1"></stop><stop offset=".495" stop-color="#3ec0f1"></stop><stop offset=".565" stop-color="#3dbffa"></stop><stop offset=".664" stop-color="#3dbffd"></stop></radialGradient><path fill="url(#2pm2zgLwrfHW4PMfqfOjYc_dGm9KIZPpukc_gr3)" d="M4,23.481C4,15.673,10.557,4,24.014,4C37.452,4,44,13.923,44,20.905	c0,5.604-4.429,9.732-9.992,9.732c-4.245,0-6.759-1.408-6.759-2.53c0-0.726,1.755-1.837,1.755-3.982	c0-2.565-2.076-10.678-12.628-10.678C13.442,13.448,5.256,14.745,4,23.481z"></path>
                        </svg>
                        <p>Edge</p>
                    </div>
                    <div class="options-contact" onClick={toFirfox}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 48 48" id="firefox"><path fill="url(#paint0_linear_147648_1535)" d="M45.7936 16.1169C44.7826 13.6844 42.732 11.058 41.1261 10.2277C42.2712 12.4453 43.0661 14.8267 43.4823 17.2875L43.4866 17.3265C40.8559 10.771 36.3968 8.12362 32.7528 2.36654C32.5685 2.07538 32.3842 1.78362 32.2047 1.47566C32.1021 1.29976 32.0198 1.14128 31.9484 0.995401C31.7973 0.702777 31.6808 0.393522 31.6014 0.0739077C31.6015 0.0591591 31.5962 0.0448875 31.5864 0.0338152C31.5767 0.022743 31.5632 0.0156451 31.5486 0.0138756C31.5342 0.00994187 31.5191 0.00994187 31.5047 0.0138756C31.5017 0.0138756 31.4969 0.0192785 31.4933 0.0204791C31.4897 0.0216798 31.4819 0.0270826 31.4765 0.0294839L31.4855 0.0138756C25.6414 3.43571 23.6573 9.7691 23.4772 12.9388C21.1426 13.0989 18.9103 13.9589 17.0718 15.4067C16.8801 15.2443 16.6797 15.0924 16.4715 14.9517C15.9414 13.096 15.9188 11.1322 16.406 9.26483C14.2598 10.3045 12.3528 11.7783 10.8057 13.5931H10.7948C9.87275 12.4243 9.93759 8.57026 9.99041 7.76523C9.71763 7.87486 9.45723 8.0131 9.2136 8.17765C8.39958 8.7586 7.6386 9.4105 6.93958 10.1257C6.14301 10.9333 5.41547 11.8062 4.76462 12.7353V12.7389V12.7347C3.26893 14.8548 2.20796 17.2501 1.64294 19.7825L1.61173 19.9361C1.5679 20.1409 1.41002 21.1662 1.38301 21.3889C1.38301 21.4063 1.3794 21.4225 1.3776 21.4399C1.17394 22.4985 1.04774 23.5705 1 24.6475V24.7675C1.01028 30.5898 3.20293 36.1966 7.14511 40.4812C11.0873 44.7658 16.4925 47.4169 22.2937 47.911C28.095 48.4051 33.8707 46.7063 38.4807 43.1501C43.0907 39.5939 46.2 34.4387 47.1947 28.702C47.2338 28.4019 47.2656 28.1047 47.3004 27.8016C47.7796 23.8406 47.2608 19.8226 45.7912 16.1133L45.7936 16.1169ZM18.9772 34.3306C19.0859 34.3829 19.1879 34.4393 19.2996 34.4891L19.3158 34.4993C19.2029 34.4453 19.0901 34.3891 18.9772 34.3306V34.3306ZM43.4872 17.3332V17.3109L43.4914 17.3356L43.4872 17.3332Z"></path><path fill="url(#paint1_radial_147648_1535)" d="M45.7938 16.1175C44.7828 13.685 42.7321 11.0586 41.1263 10.2284C42.2714 12.4459 43.0662 14.8274 43.4825 17.2882V17.3104L43.4867 17.335C45.2804 22.4672 45.021 28.094 42.7627 33.0394C40.0961 38.7611 33.6439 44.6256 23.5404 44.3375C12.6266 44.0283 3.00945 35.927 1.21449 25.3193C0.887311 23.6462 1.21449 22.7979 1.37897 21.4382C1.1546 22.4944 1.02939 23.5692 1.00497 24.6487V24.7688C1.01526 30.591 3.20791 36.1979 7.15008 40.4825C11.0923 44.7671 16.4975 47.4181 22.2987 47.9122C28.1 48.4063 33.8757 46.7076 38.4857 43.1514C43.0957 39.5952 46.2049 34.4399 47.1997 28.7033C47.2387 28.4031 47.2706 28.106 47.3054 27.8028C47.7846 23.8418 47.2658 19.8239 45.7962 16.1145L45.7938 16.1175Z"></path><path fill="url(#paint2_radial_147648_1535)" d="M45.7938 16.1175C44.7828 13.685 42.7321 11.0586 41.1263 10.2284C42.2714 12.4459 43.0662 14.8274 43.4825 17.2882V17.3104L43.4867 17.335C45.2804 22.4672 45.021 28.094 42.7627 33.0394C40.0961 38.7611 33.6439 44.6256 23.5404 44.3375C12.6266 44.0283 3.00945 35.927 1.21449 25.3193C0.887311 23.6462 1.21449 22.7979 1.37897 21.4382C1.1546 22.4944 1.02939 23.5692 1.00497 24.6487V24.7688C1.01526 30.591 3.20791 36.1979 7.15008 40.4825C11.0923 44.7671 16.4975 47.4181 22.2987 47.9122C28.1 48.4063 33.8757 46.7076 38.4857 43.1514C43.0957 39.5952 46.2049 34.4399 47.1997 28.7033C47.2387 28.4031 47.2706 28.106 47.3054 27.8028C47.7846 23.8418 47.2658 19.8239 45.7962 16.1145L45.7938 16.1175Z"></path><path fill="url(#paint3_radial_147648_1535)" d="M34.4836 18.849C34.534 18.8844 34.5808 18.9198 34.6282 18.9553C34.0438 17.9189 33.3163 16.9701 32.4671 16.1368C25.2332 8.90289 30.5719 0.456364 31.4718 0.0241324L31.4808 0.0109253C25.6366 3.43276 23.6526 9.76615 23.4725 12.9358C23.7438 12.9172 24.0128 12.8944 24.2901 12.8944C26.3635 12.8984 28.3989 13.4514 30.1893 14.4971C31.9798 15.5427 33.4614 17.0439 34.4836 18.8478V18.849Z"></path><path fill="url(#paint4_radial_147648_1535)" d="M24.3022 20.2956C24.2638 20.8743 22.2191 22.8704 21.5041 22.8704C14.8886 22.8704 13.814 26.8728 13.814 26.8728C14.107 30.243 16.4554 33.02 19.2943 34.4848C19.424 34.5521 19.5555 34.6127 19.6869 34.6721C19.9147 34.773 20.1424 34.8662 20.3701 34.9519C21.3444 35.2967 22.3649 35.4935 23.3975 35.536C34.9957 36.0799 37.2409 21.6686 28.8719 17.4843C30.846 17.2275 32.8453 17.7129 34.4819 18.8465C33.4597 17.0425 31.9781 15.5414 30.1876 14.4957C28.3972 13.45 26.3618 12.8971 24.2884 12.8931C24.0123 12.8931 23.7421 12.9159 23.4708 12.9345C21.1361 13.0946 18.9039 13.9546 17.0653 15.4024C17.4201 15.7026 17.8205 16.1036 18.664 16.935C20.2428 18.4905 24.292 20.1017 24.301 20.2908L24.3022 20.2956Z"></path><path fill="url(#paint5_radial_147648_1535)" d="M24.3022 20.2956C24.2638 20.8743 22.2191 22.8704 21.5041 22.8704C14.8886 22.8704 13.814 26.8728 13.814 26.8728C14.107 30.243 16.4554 33.02 19.2943 34.4848C19.424 34.5521 19.5555 34.6127 19.6869 34.6721C19.9147 34.773 20.1424 34.8662 20.3701 34.9519C21.3444 35.2967 22.3649 35.4935 23.3975 35.536C34.9957 36.0799 37.2409 21.6686 28.8719 17.4843C30.846 17.2275 32.8453 17.7129 34.4819 18.8465C33.4597 17.0425 31.9781 15.5414 30.1876 14.4957C28.3972 13.45 26.3618 12.8971 24.2884 12.8931C24.0123 12.8931 23.7421 12.9159 23.4708 12.9345C21.1361 13.0946 18.9039 13.9546 17.0653 15.4024C17.4201 15.7026 17.8205 16.1036 18.664 16.935C20.2428 18.4905 24.292 20.1017 24.301 20.2908L24.3022 20.2956Z"></path><path fill="url(#paint6_radial_147648_1535)" d="M15.9815 14.6346C16.17 14.7547 16.3255 14.8591 16.4618 14.9534C15.9317 13.0977 15.9091 11.1339 16.3964 9.26654C14.2501 10.3062 12.3431 11.78 10.796 13.5949C10.9094 13.5919 14.2844 13.5312 15.9815 14.6346V14.6346Z"></path><path fill="url(#paint7_radial_147648_1535)" d="M1.21027 25.3205C3.00584 35.9282 12.6224 44.0325 23.5362 44.3387C33.6396 44.6244 40.0931 38.7593 42.7585 33.0406C45.0168 28.0952 45.2762 22.4684 43.4825 17.3362V17.314C43.4825 17.2966 43.4789 17.2864 43.4825 17.2918L43.4867 17.3308C44.3122 22.7199 41.5711 27.9385 37.2854 31.4744L37.2722 31.5044C28.9217 38.3061 20.9314 35.607 19.3166 34.506C19.2037 34.452 19.0908 34.3958 18.978 34.3373C14.11 32.0105 12.0983 27.5777 12.5305 23.7717C11.375 23.7887 10.2393 23.4703 9.26103 22.855C8.28279 22.2396 7.50398 21.3538 7.01898 20.3048C8.29695 19.522 9.75409 19.0794 11.2516 19.0193C12.749 18.9592 14.237 19.2835 15.5736 19.9614C18.3286 21.212 21.4635 21.3352 24.3082 20.3048C24.2992 20.1157 20.2501 18.5038 18.6712 16.949C17.8278 16.1176 17.4274 15.7172 17.0726 15.4164C16.8808 15.254 16.6804 15.1021 16.4722 14.9614C16.3342 14.8671 16.1787 14.765 15.992 14.6426C14.2949 13.5392 10.9199 13.5998 10.8082 13.6028H10.7974C9.87531 12.434 9.94015 8.57993 9.99298 7.7749C9.72019 7.88453 9.45979 8.02278 9.21616 8.18732C8.40214 8.76828 7.64117 9.42017 6.94214 10.1354C6.14272 10.9407 5.41217 11.8116 4.75817 12.739V12.7426V12.7384C3.26249 14.8585 2.20152 17.2538 1.6365 19.7861C1.6251 19.8336 0.798453 23.4475 1.20607 25.3217L1.21027 25.3205Z"></path><path fill="url(#paint8_radial_147648_1535)" d="M32.4665 16.1354C33.3159 16.9697 34.0435 17.9195 34.6277 18.9569C34.7556 19.0536 34.875 19.1496 34.9765 19.2427C40.2515 24.1053 37.4876 30.9789 37.2817 31.4652C41.5668 27.9347 44.3055 22.7125 43.483 17.3216C40.8512 10.7601 36.3872 8.11269 32.7493 2.35561C32.565 2.06445 32.3807 1.7727 32.2012 1.46473C32.0985 1.28884 32.0163 1.13035 31.9448 0.984476C31.7937 0.691852 31.6773 0.382596 31.5979 0.0629824C31.598 0.0482338 31.5926 0.0339622 31.5829 0.0228899C31.5732 0.0118177 31.5597 0.00471977 31.545 0.00295028C31.5307 -0.000983427 31.5156 -0.000983427 31.5012 0.00295028C31.4982 0.00295028 31.4934 0.00835317 31.4898 0.00955382C31.4862 0.0107545 31.4784 0.0161574 31.473 0.0185586C30.5731 0.445387 25.2357 8.89731 32.4695 16.1252L32.4665 16.1354Z"></path><path fill="url(#paint9_radial_147648_1535)" d="M34.9759 19.2453C34.8744 19.1523 34.7549 19.0562 34.6271 18.9596C34.5796 18.9241 34.5328 18.8887 34.4824 18.8533C32.8458 17.7197 30.8466 17.2343 28.8724 17.4912C37.2409 21.6754 34.9957 36.0831 23.3981 35.5428C22.3654 35.5004 21.345 35.3035 20.3706 34.9587C20.1429 34.8735 19.9152 34.7802 19.6875 34.679C19.556 34.6189 19.4245 34.5589 19.2949 34.4917L19.3111 34.5019C20.9283 35.6059 28.9162 38.3031 37.2667 31.5003L37.2799 31.4703C37.4882 30.984 40.2521 24.1103 34.9747 19.2477L34.9759 19.2453Z"></path><path fill="url(#paint10_radial_147648_1535)" d="M13.8145 26.8692C13.8145 26.8692 14.8885 22.8669 21.5046 22.8669C22.2196 22.8669 24.2661 20.8708 24.3027 20.2921C21.458 21.3225 18.3231 21.1993 15.5681 19.9487C14.2315 19.2708 12.7435 18.9465 11.2461 19.0066C9.74859 19.0667 8.29145 19.5092 7.01349 20.2921C7.49849 21.3411 8.27729 22.2269 9.25554 22.8422C10.2338 23.4576 11.3695 23.776 12.525 23.759C12.094 27.5632 14.1051 31.9954 18.9725 34.3246C19.0812 34.3768 19.1832 34.4333 19.2949 34.4831C16.4535 33.0153 14.1075 30.2394 13.8145 26.871V26.8692Z"></path><path fill="url(#paint11_linear_147648_1535)" d="M45.7935 16.1169C44.7826 13.6844 42.7319 11.058 41.126 10.2277C42.2711 12.4453 43.066 14.8267 43.4823 17.2875L43.4865 17.3265C40.8559 10.771 36.3967 8.12362 32.7527 2.36654C32.5684 2.07538 32.3841 1.78362 32.2046 1.47566C32.102 1.29976 32.0197 1.14128 31.9483 0.995401C31.7972 0.702777 31.6807 0.393522 31.6013 0.0739077C31.6014 0.0591591 31.5961 0.0448875 31.5864 0.0338152C31.5766 0.022743 31.5631 0.0156451 31.5485 0.0138756C31.5341 0.00994187 31.519 0.00994187 31.5047 0.0138756C31.5017 0.0138756 31.4969 0.0192785 31.4933 0.0204791C31.4897 0.0216798 31.4819 0.0270826 31.4765 0.0294839L31.4855 0.0138756C25.6413 3.43571 23.6573 9.7691 23.4772 12.9388C23.7485 12.9202 24.0175 12.8974 24.2948 12.8974C26.3682 12.9014 28.4036 13.4543 30.194 14.5C31.9845 15.5457 33.4661 17.0468 34.4883 18.8508C32.8517 17.7172 30.8524 17.2318 28.8783 17.4886C37.2467 21.6729 35.0015 36.0806 23.4039 35.5403C22.3713 35.4978 21.3508 35.301 20.3765 34.9562C20.1488 34.8709 19.9211 34.7777 19.6933 34.6764C19.5619 34.6164 19.4304 34.5564 19.3007 34.4891L19.3169 34.4993C19.2041 34.4453 19.0912 34.3891 18.9784 34.3306C19.087 34.3829 19.1891 34.4393 19.3007 34.4891C16.4594 33.0207 14.1134 30.2449 13.8204 26.8771C13.8204 26.8771 14.8944 22.8747 21.5105 22.8747C22.2255 22.8747 24.272 20.8786 24.3086 20.2999C24.2996 20.1108 20.2504 18.499 18.6716 16.9441C17.8281 16.1127 17.4277 15.7123 17.0729 15.4115C16.8812 15.2491 16.6808 15.0972 16.4726 14.9565C15.9425 13.1008 15.9199 11.137 16.4072 9.26963C14.2609 10.3093 12.3539 11.7831 10.8068 13.598H10.796C9.87388 12.4291 9.93872 8.57506 9.99155 7.77003C9.71876 7.87966 9.45836 8.01791 9.21473 8.18245C8.40071 8.7634 7.63973 9.4153 6.94071 10.1305C6.14414 10.9381 5.4166 11.811 4.76575 12.7401V12.7437V12.7395C3.27006 14.8596 2.20909 17.2549 1.64407 19.7873L1.61286 19.9409C1.56903 20.1457 1.37273 21.1854 1.34451 21.4087C1.16496 22.482 1.05029 23.5652 1.00113 24.6523V24.7723C1.01141 30.5946 3.20406 36.2014 7.14624 40.486C11.0884 44.7706 16.4936 47.4217 22.2949 47.9158C28.0961 48.4099 33.8718 46.7111 38.4818 43.1549C43.0918 39.5987 46.2011 34.4435 47.1959 28.7068C47.2349 28.4067 47.2667 28.1095 47.3015 27.8064C47.7808 23.8454 47.262 19.8274 45.7923 16.1181L45.7935 16.1169ZM43.4853 17.3121L43.4895 17.3368L43.4853 17.3121Z"></path><defs><radialGradient id="paint1_radial_147648_1535" cx="0" cy="0" r="1" gradientTransform="translate(41.22 5.414) scale(48.506)" gradientUnits="userSpaceOnUse"><stop offset=".129" stop-color="#FFBD4F"></stop><stop offset=".186" stop-color="#FFAC31"></stop><stop offset=".247" stop-color="#FF9D17"></stop><stop offset=".283" stop-color="#FF980E"></stop><stop offset=".403" stop-color="#FF563B"></stop><stop offset=".467" stop-color="#FF3750"></stop><stop offset=".71" stop-color="#F5156C"></stop><stop offset=".782" stop-color="#EB0878"></stop><stop offset=".86" stop-color="#E50080"></stop></radialGradient><radialGradient id="paint2_radial_147648_1535" cx="0" cy="0" r="1" gradientTransform="translate(23.21 25.224) scale(48.506)" gradientUnits="userSpaceOnUse"><stop offset=".3" stop-color="#960E18"></stop><stop offset=".351" stop-color="#B11927" stop-opacity=".74"></stop><stop offset=".435" stop-color="#DB293D" stop-opacity=".343"></stop><stop offset=".497" stop-color="#F5334B" stop-opacity=".094"></stop><stop offset=".53" stop-color="#FF3750" stop-opacity="0"></stop></radialGradient><radialGradient id="paint3_radial_147648_1535" cx="0" cy="0" r="1" gradientTransform="translate(29.213 -5.392) scale(35.1368)" gradientUnits="userSpaceOnUse"><stop offset=".132" stop-color="#FFF44F"></stop><stop offset=".252" stop-color="#FFDC3E"></stop><stop offset=".506" stop-color="#FF9D12"></stop><stop offset=".526" stop-color="#FF980E"></stop></radialGradient><radialGradient id="paint4_radial_147648_1535" cx="0" cy="0" r="1" gradientTransform="translate(17.807 37.831) scale(23.0944)" gradientUnits="userSpaceOnUse"><stop offset=".353" stop-color="#3A8EE6"></stop><stop offset=".472" stop-color="#5C79F0"></stop><stop offset=".669" stop-color="#9059FF"></stop><stop offset="1" stop-color="#C139E6"></stop></radialGradient><radialGradient id="paint5_radial_147648_1535" cx="0" cy="0" r="1" gradientTransform="matrix(11.90362 -2.87803 3.36945 13.93616 25.557 21.061)" gradientUnits="userSpaceOnUse"><stop offset=".206" stop-color="#9059FF" stop-opacity="0"></stop><stop offset=".278" stop-color="#8C4FF3" stop-opacity=".064"></stop><stop offset=".747" stop-color="#7716A8" stop-opacity=".45"></stop><stop offset=".975" stop-color="#6E008B" stop-opacity=".6"></stop></radialGradient><radialGradient id="paint6_radial_147648_1535" cx="0" cy="0" r="1" gradientTransform="translate(22.61 3.613) scale(16.6169)" gradientUnits="userSpaceOnUse"><stop stop-color="#FFE226"></stop><stop offset=".121" stop-color="#FFDB27"></stop><stop offset=".295" stop-color="#FFC82A"></stop><stop offset=".502" stop-color="#FFA930"></stop><stop offset=".732" stop-color="#FF7E37"></stop><stop offset=".792" stop-color="#FF7139"></stop></radialGradient><radialGradient id="paint7_radial_147648_1535" cx="0" cy="0" r="1" gradientTransform="translate(35.816 -7.193) scale(70.898)" gradientUnits="userSpaceOnUse"><stop offset=".113" stop-color="#FFF44F"></stop><stop offset=".456" stop-color="#FF980E"></stop><stop offset=".622" stop-color="#FF5634"></stop><stop offset=".716" stop-color="#FF3647"></stop><stop offset=".904" stop-color="#E31587"></stop></radialGradient><radialGradient id="paint8_radial_147648_1535" cx="0" cy="0" r="1" gradientTransform="matrix(5.45243 51.6682 -33.90931 3.57837 29.924 -3.262)" gradientUnits="userSpaceOnUse"><stop stop-color="#FFF44F"></stop><stop offset=".06" stop-color="#FFE847"></stop><stop offset=".168" stop-color="#FFC830"></stop><stop offset=".304" stop-color="#FF980E"></stop><stop offset=".356" stop-color="#FF8B16"></stop><stop offset=".455" stop-color="#FF672A"></stop><stop offset=".57" stop-color="#FF3647"></stop><stop offset=".737" stop-color="#E31587"></stop></radialGradient><radialGradient id="paint9_radial_147648_1535" cx="0" cy="0" r="1" gradientTransform="translate(22.61 9.616) scale(44.2557)" gradientUnits="userSpaceOnUse"><stop offset=".137" stop-color="#FFF44F"></stop><stop offset=".48" stop-color="#FF980E"></stop><stop offset=".592" stop-color="#FF5634"></stop><stop offset=".655" stop-color="#FF3647"></stop><stop offset=".904" stop-color="#E31587"></stop></radialGradient><radialGradient id="paint10_radial_147648_1535" cx="0" cy="0" r="1" gradientTransform="translate(34.015 12.017) scale(48.4399)" gradientUnits="userSpaceOnUse"><stop offset=".094" stop-color="#FFF44F"></stop><stop offset=".231" stop-color="#FFE141"></stop><stop offset=".509" stop-color="#FFAF1E"></stop><stop offset=".626" stop-color="#FF980E"></stop></radialGradient><linearGradient id="paint0_linear_147648_1535" x1="42.714" x2="4.087" y1="7.446" y2="44.714" gradientUnits="userSpaceOnUse"><stop offset=".048" stop-color="#FFF44F"></stop><stop offset=".111" stop-color="#FFE847"></stop><stop offset=".225" stop-color="#FFC830"></stop><stop offset=".368" stop-color="#FF980E"></stop><stop offset=".401" stop-color="#FF8B16"></stop><stop offset=".462" stop-color="#FF672A"></stop><stop offset=".534" stop-color="#FF3647"></stop><stop offset=".705" stop-color="#E31587"></stop></linearGradient><linearGradient id="paint11_linear_147648_1535" x1="42.246" x2="9.384" y1="7.248" y2="40.115" gradientUnits="userSpaceOnUse"><stop offset=".167" stop-color="#FFF44F" stop-opacity=".8"></stop><stop offset=".266" stop-color="#FFF44F" stop-opacity=".634"></stop><stop offset=".489" stop-color="#FFF44F" stop-opacity=".217"></stop><stop offset=".6" stop-color="#FFF44F" stop-opacity="0"></stop></linearGradient></defs></svg>
                        <p>FireFox</p>
                    </div>
                    <div class="options-contact">
                        <img class="options-donate-img options-donate-afdian" src={wechat} />
                        <p>{browser.i18n.getMessage('tips_wechatGroup')}</p>
                    </div>
                </div>
            </div>
        );
    }
});

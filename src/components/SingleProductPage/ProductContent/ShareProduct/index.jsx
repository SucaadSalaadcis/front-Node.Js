import { useState } from "react";
import { FacebookShareButton, TwitterShareButton, PinterestShareButton } from "next-share";
import { Tooltip } from 'reactstrap';
import { useTranslation } from "next-i18next";

const ShareProduct = ({seoTitle}) => {

    const { t } = useTranslation('product');

    const [ tooltipOpenPinterest, setTooltipOpenPinterest ] = useState(false);

    const [ tooltipOpenFacebook, setTooltipOpenFacebook ] = useState(false);

    const [ tooltipOpenTwitter, setTooltipOpenTwitter ] = useState(false);

    const [ tooltipOpenCopyLink, setTooltipOpenCopyLink ] = useState(false);

    const togglePinterest = () => setTooltipOpenPinterest(!tooltipOpenPinterest);

    const toggleFacebook = () => setTooltipOpenFacebook(!tooltipOpenFacebook);

    const toggleTwitter = () => setTooltipOpenTwitter(!tooltipOpenTwitter);

    const toggleCopyLink = () => setTooltipOpenCopyLink(!tooltipOpenCopyLink);

    const [ copy, setCopy ] = useState(false);

    return(
        <ul className='social-share'>
            <li>
                <FacebookShareButton
                    url={typeof window !== 'undefined' && window.location.href}
                    quote={seoTitle}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" id='Facebook'><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                    <Tooltip isOpen={tooltipOpenFacebook} target="Facebook" toggle={toggleFacebook}>
                        {t('share_on_facebook')}
                    </Tooltip>
                </FacebookShareButton>
            </li>
            <li>
                <TwitterShareButton
                    url={typeof window !== 'undefined' && window.location.href}
                    quote={seoTitle}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" id='Twitter'><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
                    <Tooltip isOpen={tooltipOpenTwitter} target="Twitter" toggle={toggleTwitter}>
                        {t('share_on_twitter')}
                    </Tooltip>
                </TwitterShareButton>
            </li>
            <li>
                <PinterestShareButton
                    url={typeof window !== 'undefined' && window.location.href}
                    quote={seoTitle}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" id='Pinterest'><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                    <Tooltip isOpen={tooltipOpenPinterest} target="Pinterest" toggle={togglePinterest}>
                        {t('share_on_pinterest')}
                    </Tooltip>
                </PinterestShareButton>
            </li>
            <li onClick={
                () => {
                    navigator.clipboard.writeText(typeof window !== 'undefined' && window.location.href).then(() => {
                        setCopy(true);
                    },() => {
                        console.error('Failed to copy');
                        setCopy(false);
                    });
                }
            }>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" id="CopyLink"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                <Tooltip isOpen={tooltipOpenCopyLink} target="CopyLink" toggle={toggleCopyLink}>
                    { copy ? t('copied') : t('copy_link') }
                </Tooltip>
            </li>
        </ul>
    )
}

export default ShareProduct;
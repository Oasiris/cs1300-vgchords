import React from 'react'

// export const Footer: React.FC = () => (
//     <div id="footer">
//         <div>Made with ♥ in React</div>
//     </div>
// )

const FooterNav: React.FC = () => (
    <div className="lineNavWrapper">
        <div className="boldLineRack" />
    </div>
)

export const Footer: React.FC = () => (
    <section id="footer">
        <footer>
            <div className="outerContainer">
                <FooterNav />
                {/* These don't lead anywhere for now */}
                <div className="footerNavBar">
                    <a href="/">About</a>
                    <a href="/">Help</a>
                    <a href="/">Legal</a>
                </div>
            </div>
        </footer>
    </section>
)

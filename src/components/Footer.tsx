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
                {/* TODO: Make About, Help, & Legal pages */}
                <div className="footerNavBar">
                    <a>About</a>
                    <a>Help</a>
                    <a>Legal</a>
                </div>
            </div>
        </footer>
    </section>
)

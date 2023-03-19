import * as React from 'react'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import { social } from './header/data'

export default function Footer() {
  return (
    <Container align="center">
      <Typography variant="body2" color="text.secondary">
        {'Copyright © '}
        <Link color="inherit" href="/">
          ምሳ
        </Link>{' '}
        {new Date().getFullYear()}
        <ul className="social-icons" align='center'>
          {social.map((socialIcon) => {
            const { id, url, icon } = socialIcon
            return (
              <li key={id} className='d-flex'>
                <a href={url}>{icon}</a>
              </li>
            )
          })}
        </ul>
      </Typography>
    </Container>
  )
}

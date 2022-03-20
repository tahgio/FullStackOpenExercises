// blog_app.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
const blogs = [
    {
      id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      user: {
          username: "jubilas",
          name: "Ju Bileu",
          id: "42325df56b7a3e297f4a3d42"
      }
    },
    {
      id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      user: {
        username: "jubilas",
        name: "Ju Bileu",
        id: "42325df56b7a3e297f4a3d42"
    }
    },
    {
      id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      user: {
        username: "jubilas",
        name: "Ju Bileu",
        id: "42325df56b7a3e297f4a3d42"
    }
    },
    {
      id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      user: {
        username: "jubilas",
        name: "Ju Bileu",
        id: "42325df56b7a3e297f4a3d42"
    }
    },
    {
      id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      user: {
        username: "jubilas",
        name: "Ju Bileu",
        id: "42325df56b7a3e297f4a3d42"
    }
    },
    {
      id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      user: {
        username: "montevideu",
        name: "Monte Videu",
        id: "52325df56b7a3e297f4a3d52"
    }
    }  
  ]

  const user = {
    name: 'Ju Bileu',
    username: 'jubilas',
    password: 'leubiju',
    id: '42325df56b7a3e297f4a3d42',
    blogs: [
        {
          id: "5a422a851b54a676234d17f7",
          title: "React patterns",
          author: "Michael Chan",
          url: "https://reactpatterns.com/",
          likes: 7,
        },
        {
          id: "5a422aa71b54a676234d17f8",
          title: "Go To Statement Considered Harmful",
          author: "Edsger W. Dijkstra",
          url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
          likes: 5,
        },
        {
          id: "5a422b3a1b54a676234d17f9",
          title: "Canonical string reduction",
          author: "Edsger W. Dijkstra",
          url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
          likes: 12,
        },
        {
          id: "5a422b891b54a676234d17fa",
          title: "First class tests",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
          likes: 10
        },
        {
          id: "5a422ba71b54a676234d17fb",
          title: "TDD harms architecture",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
          likes: 0,
        },  
      ]
    
}

describe('Blog app', function() {

beforeEach(function(){
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is show', function() {
        cy.contains('Log in')
        cy.contains("username")
        cy.contains("password")
    })

    it('login unsuccessful', function() {
        cy.get('#username').type('jubileu?')
        cy.get('#password').type('bijuleu')
        cy.get('#login-btn').click()
        cy.get('.err').contains('Wrong username/password')
        cy.get('.err').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
   
    it('login successful', function() {
        cy.contains('Log in')
        cy.get('#username').type('jubilas')
        cy.get('#password').type('leubiju')
        cy.get('#login-btn').click()
    })

    it('logout successful', function() {
        cy.get('#logout-btn').click()
        cy.on('uncaught:exception', function(err, runnable) {
            return false
        })
    })
        


describe('when logged in', function(){
    beforeEach(function(){
        cy.login({username: 'jubilas', password: 'leubiju'})
    })

    it('a new note can be created', function(){
        cy.contains('new note').click()
        cy.get('#crtitle').type('Blog do Jubileu')
        cy.get('#crauthor').type('Ju Bileu')
        cy.get('#crurl').type('blog-do-jubilas.org')
        cy.contains('save').click()

        cy.get('.msg').contains('Blog do Jubileu')
        cy.get('.msg').should('have.css', 'color', 'rgb(0, 128, 0)')
    })

    describe('blogs exists', function(){
        beforeEach(function(){
            cy.createBlog({title: 'Blog1', author: 'Ju Bileu', url:'blog1.com'})
            cy.createBlog({title: 'Blog2', author: 'Ju Bileu', url:'blog2.com'})
            cy.createBlog({title: 'Blog3', author: 'Ju Bileu', url:'blog3.com'})
        })
        
    it('likes button is working and blogs are displayed by likes', function(){
        cy.contains('Blog2').parent()
        .find('button').as('blog2view').contains('view').click()
        cy.get('@blog2view').contains('like').click()
        cy.contains('Likes: 2')
        cy.get('@blog2view').contains('like').click()
        cy.contains('Likes: 3')
        cy.get('.blogsdivs').first().contains('Blog2')
    })
    it('creator can delete a blog', function(){
        cy.contains('Blog2').parent()
        .find('button').as('blog2view').contains('view').click()
        cy.get('@blog2view').contains('remove').click()
        cy.get('html').should('not.contain', 'Blog2')
    })

    })


})

    


        

})
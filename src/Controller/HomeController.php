<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class HomeController extends AbstractController
{
    #[Route('/', name: 'app_home', methods: ['GET'])]
    public function __invoke(): Response
    {
        return $this->render('home/index.html.twig', [
            'infrastructureNodes' => [
                [
                    'title' => 'Enterprise GPU Clusters',
                    'description' => 'NVIDIA H100, H200, Blackwell-class and custom accelerated environments.',
                    'icon' => 'gpu',
                    'angle' => -90,
                    'delay' => '0.1s',
                ],
                [
                    'title' => 'Dedicated Compute Nodes',
                    'description' => 'Bare-metal CPU and GPU deployments built for consistent workload isolation.',
                    'icon' => 'server',
                    'angle' => -45,
                    'delay' => '0.8s',
                ],
                [
                    'title' => 'AI Training',
                    'description' => 'Parallel compute lanes tuned for large training jobs and model iteration.',
                    'icon' => 'brain',
                    'angle' => 0,
                    'delay' => '1.5s',
                ],
                [
                    'title' => 'AI Inference',
                    'description' => 'Low-latency execution paths sized for real-time and production inference.',
                    'icon' => 'inference',
                    'angle' => 45,
                    'delay' => '2.2s',
                ],
                [
                    'title' => 'High-Speed Networking',
                    'description' => 'Dense interconnects, fiber backbones, and resilient network design.',
                    'icon' => 'network',
                    'angle' => 90,
                    'delay' => '2.9s',
                ],
                [
                    'title' => 'NVMe Storage',
                    'description' => 'Ultra-fast NVMe tiers for high IOPS workloads and fast dataset access.',
                    'icon' => 'storage',
                    'angle' => 135,
                    'delay' => '3.6s',
                ],
                [
                    'title' => 'Cloud Deployment',
                    'description' => 'Private cloud and hybrid rollout patterns built for flexible scaling.',
                    'icon' => 'cloud',
                    'angle' => 180,
                    'delay' => '4.3s',
                ],
                [
                    'title' => '24/7 Monitoring',
                    'description' => 'Continuous observability, alerting, and response coverage around the clock.',
                    'icon' => 'monitoring',
                    'angle' => 225,
                    'delay' => '5s',
                ],
            ],
            'siteLocations' => [
                [
                    'label' => 'Site 1',
                    'title' => 'Technical Center, Billingstad, Norway',
                    'description' => 'Operational enterprise site built for premium GPU workloads, secure hosting, and immediate deployment readiness.',
                    'metrics' => ['H200', 'RTX 6000 Blackwell S'],
                    'gradient' => 'linear-gradient(135deg, rgba(44, 98, 255, 0.44), rgba(255, 163, 72, 0.34))',
                    'image' => 'images/site-billingstad-real-v1.webp',
                    'imageWidth' => 1280,
                    'imageHeight' => 642,
                    'imagePosition' => 'center 48%',
                    'imageFilter' => 'brightness(1.03) contrast(1.08) saturate(0.9)',
                    'timeline' => 'Live now',
                ],
                [
                    'label' => 'Site 2',
                    'title' => 'Bodo Harbor Compute Site, Norway',
                    'description' => 'Fast-turn deployment cluster dedicated to dense workstation-class AI, rendering, and production compute capacity.',
                    'metrics' => ['RTX 5090', 'RTX 4090'],
                    'gradient' => 'linear-gradient(135deg, rgba(58, 166, 255, 0.36), rgba(110, 255, 185, 0.22))',
                    'image' => 'images/site-bodo-real-v3.webp',
                    'imageWidth' => 547,
                    'imageHeight' => 365,
                    'imagePosition' => 'center 52%',
                    'imageFilter' => 'brightness(1.02) contrast(1.04) saturate(0.96)',
                    'timeline' => 'Live now',
                ],
                [
                    'label' => 'Site 3',
                    'title' => 'Data Center, Bodo, Norway',
                    'description' => 'Q4 2027 scale-out phase for the current Site 2 footprint, designed around large enterprise GPU density and resilient northern operations.',
                    'metrics' => ['B300', 'B200', 'H200', 'RTX 6000 Blackwell S'],
                    'gradient' => 'linear-gradient(135deg, rgba(76, 136, 255, 0.34), rgba(112, 236, 214, 0.2))',
                    'image' => 'images/site-bodo-photo-clean-v1.webp',
                    'imageWidth' => 1536,
                    'imageHeight' => 1024,
                    'timeline' => 'Q4 2027',
                ],
                [
                    'label' => 'Site 4',
                    'title' => 'Solar Compute Hub, Alicante, Spain',
                    'description' => 'Q4 2027 southern expansion extending flexible regional capacity for accelerated workloads and power-aware production operations.',
                    'metrics' => ['RTX 5090', 'RTX 4090'],
                    'gradient' => 'linear-gradient(135deg, rgba(255, 176, 51, 0.42), rgba(216, 91, 255, 0.24))',
                    'image' => 'images/site-alicante-photo-clean-v1.webp',
                    'imageWidth' => 1651,
                    'imageHeight' => 953,
                    'timeline' => 'Q4 2027',
                ],
            ],
            'platformActivityCards' => [
                [
                    'icon' => 'servers',
                    'title' => 'Dedicated Compute Capacity',
                    'description' => 'We own and operate cutting-edge GPU clusters delivering exceptional performance and efficiency.',
                ],
                [
                    'icon' => 'cloud',
                    'title' => 'Scalable Infrastructure',
                    'description' => 'Elastic, secure, and reliable infrastructure designed to scale with your workload and business.',
                ],
                [
                    'icon' => 'shield',
                    'title' => 'Enterprise Security',
                    'description' => 'Bank-level security, compliance, and isolation to protect your data and applications.',
                ],
                [
                    'icon' => 'support',
                    'title' => 'Expert Support',
                    'description' => '24/7 expert support to ensure your workloads run smoothly, at any scale, anytime.',
                ],
            ],
            'platformIndustryTiles' => [
                ['icon' => 'ai', 'title' => 'Artificial Intelligence'],
                ['icon' => 'mesh', 'title' => 'Machine Learning'],
                ['icon' => 'research', 'title' => 'Research'],
                ['icon' => 'bio', 'title' => 'Biotechnology'],
                ['icon' => 'finance', 'title' => 'Finance'],
                ['icon' => 'render', 'title' => 'Media & Rendering'],
                ['icon' => 'engineering', 'title' => 'Engineering'],
                ['icon' => 'hpc', 'title' => 'HPC'],
            ],
        ]);
    }
}
